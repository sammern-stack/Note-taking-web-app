import api from "./axios";
import { fetchApi } from "./util";

import type { AuthResult, IUser, VoidResult, TApiPromise } from "../types";

export type TLogin = Pick<IUser, "email" | "password">;
export type TRegister = Omit<IUser, "_id">;

export const loginUser = (credentials: TLogin): AuthResult =>
  fetchApi(() => api.post("/auth/login", credentials));

export const registerUser = (userData: TRegister): AuthResult =>
  fetchApi(() => api.post("/auth/register", userData));

export const refreshJWT = (): AuthResult =>
  fetchApi(() => api.post("/auth/refresh"));

export const logoutUser = (): VoidResult =>
  fetchApi(() => api.post("/auth/logout"));

export const logoutAllUser = (): VoidResult =>
  fetchApi(() => api.post("/auth/logout-all"));

export const getMe = (): TApiPromise<IUser> =>
  fetchApi(() => api.get("/auth/me"));
