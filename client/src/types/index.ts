// Models
export interface INote {
  title: string;
  tags: string[];
  content: string;
  isArchived: boolean;
}

export interface IUser {
  _id: string;
  username: string;
  email: string;
  password: string;
}

// Api data
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  meta?: object;
  msg?: string;
}

export type ApiResult<T> = { ok: true; data: T } | { ok: false; error: string };

export interface AuthResponseData {
  user: IUser;
  accessToken: string;
}

// Auth data
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
}
