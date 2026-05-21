import type { Types } from "mongoose";

// Models

// Note model
export interface INote {
  title: string;
  tags: string[];
  content: string;
  isArchived: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type TNewNote = Omit<INote, "createdAt" | "updatedAt">;

// User model
export interface IUser {
  _id: string;
  username: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserDocument extends Omit<IUser, "_id">, Document {
  comparePassword(candidatePassword: string): Promise<boolean>;
}

// RefreshToken model
export interface IRefreshToken {
  token: string,
  user: Types.ObjectId;
  expiresAt: Date;
  createdAt: Date;
}

// Controller Requests types
export interface INoteParams {
  id?: string;
}

export type TCreateNoteBody = TNewNote;
export type TUpdateNoteBody = Partial<TNewNote>;

// JWT payloads
export interface IAccessTokenPayload {
  userId: string;
}

export interface IRefreshTokenPayload {
  userId: string;
}