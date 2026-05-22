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

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  meta?: object;
  msg?: string;
}

export interface AuthResponseData {
  user: IUser;
  accessToken: string;
}