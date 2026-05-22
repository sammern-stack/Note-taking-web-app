export type TAccessToken = string | null;

export type TQueueFn = (token: string) => void;

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  meta?: object;
  msg?: string;
}

export type ApiResult<T> = { ok: true; data: T } | { ok: false; error: string };
