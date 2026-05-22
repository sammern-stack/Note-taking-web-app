import type { IUser } from ".";
import type { ApiResult } from "./axios";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
}

export interface AuthResponseData {
  user: IUser;
  accessToken: string;
}


export type AuthStatus = "idle" | "loading" | "authenticated" | "unauthenticated";
export type AuthResult = Promise<ApiResult<AuthResponseData>>;
export type VoidResult = Promise<ApiResult<void>>;
export type AuthAction = () => Promise<void>;