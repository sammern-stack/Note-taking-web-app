import api, { apiCall } from "./axios.js";
import type { ApiResult, INote } from "../types/index.js";

type TNewNote = Omit<INote, "_id" | "createdAt" | "updatedAt">;
type TCreateNoteBody = TNewNote;
type TUpdateNoteBody = Partial<TNewNote>;

type NoteResult = Promise<ApiResult<INote>>;
type NotesResult = Promise<ApiResult<INote[]>>;

export const getNotesRequest = (): NotesResult =>
  apiCall(() => api.get("/notes"));

export const getNoteByIdRequest = (id: string): NoteResult =>
  apiCall(() => api.get(`/notes/${id}`));

export const createNoteRequest = (body: TCreateNoteBody): NoteResult =>
  apiCall(() => api.post("/notes", body));

export const updateNoteRequest = (
  id: string,
  body: TUpdateNoteBody,
): NoteResult => apiCall(() => api.put(`/notes/${id}`, body));

export const deleteNoteRequest = (id: string): Promise<ApiResult<void>> =>
  apiCall(() => api.delete(`/notes/${id}`));
