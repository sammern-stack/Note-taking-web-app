// Models
export interface INote {
  _id: string;
  title: string;
  tags: string[];
  content: string;
  isArchived: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IUser {
  _id: string;
  username: string;
  email: string;
  password: string;
}

// Axios
export * from "./axios";
export * from "./auth";
export * from "./notes"