//—————————————————————————————————————————————————————————————————
// Imports
//—————————————————————————————————————————————————————————————————

import api from "./axios";
import { fetchApi } from "./util";

import type { IUser, TApiPromise } from "../types";

//—————————————————————————————————————————————————————————————————
// Types
//—————————————————————————————————————————————————————————————————

export type TLogin = Pick<IUser, "email" | "password">;
export type TRegister = Omit<IUser, "_id">;
export type TReset = {
  token: string;
  newPassword: string;
  confirmPassword: string;
};

type AuthResult = TApiPromise<{ user: IUser; accessToken: string }>;
type VoidResult = TApiPromise<void>;
type UserResult = TApiPromise<IUser>;
type ForgotPswd = TApiPromise<string>;
type ResetPswd = TApiPromise<boolean>;

//—————————————————————————————————————————————————————————————————
// Auth Requests
//—————————————————————————————————————————————————————————————————

export const loginUser = (credentials: TLogin): AuthResult =>
  fetchApi(() => api.post("/auth/login", credentials));

export const registerUser = (userData: TRegister): AuthResult =>
  fetchApi(() => api.post("/auth/register", userData));

export const refreshJWT = (): AuthResult =>
  fetchApi(() => api.post("/auth/refresh"));

export const forgotUserPswd = (email: string): ForgotPswd =>
  fetchApi(() => api.post("/auth/forgot-pw", { email }));

export const resetUserPswd = (data: TReset): ResetPswd =>
  fetchApi(() => api.post("/auth/reset-pw", data));

//—————————————————————————————————————————————————————————————————
// Session Requests
//—————————————————————————————————————————————————————————————————

export const logoutUser = (): VoidResult =>
  fetchApi(() => api.post("/auth/logout"));

export const logoutAllUser = (): VoidResult =>
  fetchApi(() => api.post("/auth/logout-all"));

//—————————————————————————————————————————————————————————————————
// User Requests
//—————————————————————————————————————————————————————————————————

export const getMe = (): UserResult => fetchApi(() => api.get("/auth/me"));
