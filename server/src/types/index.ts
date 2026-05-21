import type { Response } from "express";

// Models
export interface INote {
  title: string;
  tags: string[];
  content: string;
  isArchived: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type TNewNote = Omit<INote, "createdAt" | "updatedAt">;

// Controller Requests types
export interface INoteParams {
  id: string;
}

export type ICreateNoteBody = TNewNote;
export type IUpdateNoteBody = Partial<TNewNote>;
