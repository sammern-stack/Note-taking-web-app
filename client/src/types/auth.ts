import type { FormikHelpers } from "formik";
import type { IUser } from ".";
import type { TApiPromise } from "./axios";

export interface AuthResponseData {
  user: IUser;
  accessToken: string;
}

export type AuthResult = TApiPromise<AuthResponseData>;
export type VoidResult = TApiPromise<void>;

export type TOnSubmit<T> = (
  values: T,
  helpers: FormikHelpers<T>,
) => Promise<void>;
