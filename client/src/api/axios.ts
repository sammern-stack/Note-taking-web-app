import axios from "axios";

import type { AxiosError, InternalAxiosRequestConfig } from "axios";
import type {
  ApiResponse,
  AuthResponseData,
  TAccessToken,
  TQueueFn,
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

// After every response silently issues new token when previous expires
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    const isRefreshEndpoint = originalRequest.url?.includes("/auth/refresh");
    const is401 = error.response?.status !== 401;
    const hasRetried = originalRequest._retry;

    const shouldReject = isRefreshEndpoint || !is401 || hasRetried;
    if (shouldReject) return Promise.reject(error);

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

export default api;
