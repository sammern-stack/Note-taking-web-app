export type TAccessToken = string | null;

export type TQueueFn = (token: string) => void;

export type IApiSuccess<T> = {
  ok: true;
  data: T;
  meta?: object;
  msg?: string;
};

export type IApiFailure = {
  ok: false;
  error: string;
};

export type TApiResponse<T> = IApiSuccess<T> | IApiFailure;
export type TApiPromise<T> = Promise<TApiResponse<T>>;
