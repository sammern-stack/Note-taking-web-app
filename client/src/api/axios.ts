//—————————————————————————————————————————————————————————————————
// Imports
//—————————————————————————————————————————————————————————————————

import axios from "axios";
import type { AxiosError, InternalAxiosRequestConfig } from "axios";

import type { IApiSuccess, IUser } from "../types";

//—————————————————————————————————————————————————————————————————
// Types
//—————————————————————————————————————————————————————————————————

type Token = string | null;
type TRefreshCall = IApiSuccess<{ user: IUser; accessToken: string }>;
type TQueueFn = (token: string) => void;
type AxiosConfig = InternalAxiosRequestConfig & { _retry?: boolean };

//—————————————————————————————————————————————————————————————————
// Token Storage
//—————————————————————————————————————————————————————————————————

let accessToken: Token = null;

export const setAccessToken = (token: Token) => {
  accessToken = token;
};

export const getAccessToken = (): Token => accessToken;

//—————————————————————————————————————————————————————————————————
// Refresh Queue
//—————————————————————————————————————————————————————————————————

// Prevents multiple simultaneous refresh requests when several
// API calls fail with 401 at the same time

let isRefreshing = false;
let refreshSubscribers: TQueueFn[] = [];

const onRefresh = (token: string) => {
  refreshSubscribers.forEach((fn) => fn(token));
  refreshSubscribers = [];
};

const addRefreshSubscriber = (fn: TQueueFn): void => {
  refreshSubscribers.push(fn);
};

//—————————————————————————————————————————————————————————————————
// Axios Instance
//—————————————————————————————————————————————————————————————————

const api = axios.create({
  baseURL: "http://localhost:3001/api",
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

//—————————————————————————————————————————————————————————————————
// Interceptors
//—————————————————————————————————————————————————————————————————

// Attach access token on every request
api.interceptors.request.use(
  (config: AxiosConfig) => {
    if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
  },
  (error) => Promise.reject(error),
);

// After every response silently issues new token when previous expires
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosConfig;

    const isRefreshEndpoint = originalRequest.url?.includes("/auth/refresh");
    const is401 = error.response?.status !== 401;
    const hasRetried = originalRequest._retry;

    const shouldReject = isRefreshEndpoint || !is401 || hasRetried;
    if (shouldReject) return Promise.reject(error);

    originalRequest._retry = true;

    // If refreshing any request that comes in goes in a queue
    if (isRefreshing)
      return new Promise((resolve) =>
        addRefreshSubscriber((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          resolve(api(originalRequest));
        }),
      );

    isRefreshing = true;

    try {
      const { data } = await api.post<TRefreshCall>("/auth/refresh");

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
