import api, { apiCall } from "./axios";
import type {
  LoginCredentials,
  RegisterData,
  ApiResult,
  AuthResponseData,
  IUser,
} from "../types";

type AuthResult = Promise<ApiResult<AuthResponseData>>;
type VoidResult = Promise<ApiResult<void>>;

export const loginRequest = (credentials: LoginCredentials): AuthResult =>
  apiCall(() => api.post("/auth/login", credentials));

export const registerRequest = (userData: RegisterData): AuthResult =>
  apiCall(() => api.post("/auth/register", userData));

export const refreshRequest = (): AuthResult =>
  apiCall(() => api.post("/auth/refresh"));

export const logoutRequest = (): VoidResult =>
  apiCall(() => api.post("/auth/logout"));

export const logoutAllRequest = (): VoidResult =>
  apiCall(() => api.post("/auth/logout-all"));

export const getMeRequest = (): Promise<ApiResult<IUser>> =>
  apiCall(() => api.get("/auth/me"));
