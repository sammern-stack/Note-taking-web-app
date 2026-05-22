import axios from "axios";

import type { AxiosError, InternalAxiosRequestConfig } from "axios";
import type {
  ApiResponse,
  AuthResponseData,
  ApiResult,
  TAccessToken,
  TQueueFn,
  TApiCallFn,
} from "../types";

let accessToken: TAccessToken = null;

export const setAccessToken = (token: TAccessToken): void => {
  accessToken = token;
};

export const getAccessToken = (): TAccessToken => accessToken;

let isRefreshing = false;
let refreshSubscribers: TQueueFn[] = [];

const onRefresh = (token: string): void => {
  refreshSubscribers.forEach((callback) => callback(token));
  refreshSubscribers = [];
};

const addRefreshSubscriber = (callback: TQueueFn): void => {
  refreshSubscribers.push(callback);
};

const api = axios.create({
  baseURL: "http://localhost:3001/api",
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

// Attach access token on every request
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    // Reject early if its 401 or api retried once already
    if (error.response?.status !== 401 || originalRequest._retry)
      return Promise.reject(error);

    // When calling refresh endpoint reject otherwise will cause infinite refresh loop
    if (originalRequest.url?.includes("/auth/refresh"))
      return Promise.reject(error);

    originalRequest._retry = true;

    // If refreshing any request that comes in goes in a queue
    if (isRefreshing)
      return new Promise((resolve) =>
        addRefreshSubscriber((token: string) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          resolve(api(originalRequest));
        }),
      );

    isRefreshing = true;

    try {
      const { data } =
        await api.post<ApiResponse<AuthResponseData>>("/auth/refresh");

      const newToken = data.data.accessToken;
      setAccessToken(newToken);

      // Notify the queue with the new token
      onRefresh(newToken);

      // Retry the original 401 failed request with the new token
      originalRequest.headers.Authorization = `Bearer ${newToken}`;
      return api(originalRequest);
    } catch {
      // Refresh failed, dispatch an event so the authStore can listen to it
      setAccessToken(null);
      window.dispatchEvent(new CustomEvent("auth:logout"));
      return Promise.reject(error);
    } finally {
      isRefreshing = false;
    }
  },
);

const unwrap = async <T>(fn: TApiCallFn<T>): Promise<T> => {
  const { data } = await fn();
  return data.data;
};

export const apiCall = async <T>(fn: TApiCallFn<T>): Promise<ApiResult<T>> => {
  try {
    const data = await unwrap(fn);
    return { ok: true, data };
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    return {
      ok: false,
      error:
        error.response?.data?.message ||
        error.message ||
        `An unexpected error occurred: ${err}`,
    };
  }
};

export default api;
