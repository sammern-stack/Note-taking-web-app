import api, { apiCall } from "./axios";

import type {
  ApiResult,
  AuthResult,
  IUser,
  LoginCredentials,
  RegisterData,
  VoidResult,
} from "../types";

export const loginUser = (credentials: LoginCredentials): AuthResult =>
  apiCall(() => api.post("/auth/login", credentials));

export const registerUser = (userData: RegisterData): AuthResult =>
  apiCall(() => api.post("/auth/register", userData));

export const refreshJWT = (): AuthResult =>
  apiCall(() => api.post("/auth/refresh"));

export const logoutUser = (): VoidResult =>
  apiCall(() => api.post("/auth/logout"));

export const logoutAllUser = (): VoidResult =>
  apiCall(() => api.post("/auth/logout-all"));

export const getMe = (): Promise<ApiResult<IUser>> =>
  apiCall(() => api.get("/auth/me"));
