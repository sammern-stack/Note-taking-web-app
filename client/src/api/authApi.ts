import api from "./axios";
import { fetchApi } from "./util";

import type {
  ApiResult,
  AuthResult,
  IUser,
  LoginCredentials,
  RegisterData,
  VoidResult,
} from "../types";

export const loginUser = (credentials: LoginCredentials): AuthResult =>
  fetchApi(() => api.post("/auth/login", credentials));

export const registerUser = (userData: RegisterData): AuthResult =>
  fetchApi(() => api.post("/auth/register", userData));

export const refreshJWT = (): AuthResult =>
  fetchApi(() => api.post("/auth/refresh"));

export const logoutUser = (): VoidResult =>
  fetchApi(() => api.post("/auth/logout"));

export const logoutAllUser = (): VoidResult =>
  fetchApi(() => api.post("/auth/logout-all"));

export const getMe = (): Promise<ApiResult<IUser>> =>
  fetchApi(() => api.get("/auth/me"));
