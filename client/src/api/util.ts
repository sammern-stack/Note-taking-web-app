import type { AxiosError } from "axios";
import type { ApiResponse, ApiResult } from "../types";

type TFetchApiFn<T> = () => Promise<{ data: ApiResponse<T> }>;
type TFetchRes<T> = Promise<ApiResult<T>>;

export const fetchApi = async <T>(fn: TFetchApiFn<T>): TFetchRes<T> => {
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
