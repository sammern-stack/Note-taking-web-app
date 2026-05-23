import type { INote, TApiPromise } from ".";

export type TNewNote = Omit<INote, "_id" | "createdAt" | "updatedAt">;
export type TCreateNoteBody = TNewNote;
export type TUpdateNoteBody = Partial<TNewNote>;

export type NoteResult = TApiPromise<INote>;
export type NotesResult = TApiPromise<INote[]>;