import type { ApiResult, INote } from ".";

export type TNewNote = Omit<INote, "_id" | "createdAt" | "updatedAt">;
export type TCreateNoteBody = TNewNote;
export type TUpdateNoteBody = Partial<TNewNote>;

export type NoteResult = Promise<ApiResult<INote>>;
export type NotesResult = Promise<ApiResult<INote[]>>;