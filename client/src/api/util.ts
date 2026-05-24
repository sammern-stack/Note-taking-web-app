//—————————————————————————————————————————————————————————————————
// Imports
//—————————————————————————————————————————————————————————————————

import type { AxiosError } from "axios";
import type { IApiSuccess, TApiPromise } from "../types";

//—————————————————————————————————————————————————————————————————
// Types
//—————————————————————————————————————————————————————————————————

type TFetchApiFn<T> = () => Promise<{ data: IApiSuccess<T> }>;

//—————————————————————————————————————————————————————————————————
// Utility function: Fetching data from an api endpoint 
// and handles errors
//—————————————————————————————————————————————————————————————————

export const fetchApi = async <T>(fn: TFetchApiFn<T>): TApiPromise<T> => {
  try {
    const { data } = await fn();
    return { ok: true, data: data.data };
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
