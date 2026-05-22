import type { AxiosError } from "axios";
import type { ApiResponse, ApiResult } from "../types";

type TFetchApiFn<T> = () => Promise<{ data: ApiResponse<T> }>;

const unwrap = async <T>(fn: TFetchApiFn<T>): Promise<T> => {
  const { data } = await fn();
  return data.data;
};

export const fetchApi = async <T>(fn: TFetchApiFn<T>): Promise<ApiResult<T>> => {
  try {
    const data = await unwrap(fn);
    return { ok: true, data };
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
