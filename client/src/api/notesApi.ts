import api, { apiCall } from "./axios.js";

import type {
  NoteResult,
  NotesResult,
  TCreateNoteBody,
  TUpdateNoteBody,
  VoidResult,
} from "../types/index.js";

export const getNotes = (): NotesResult => apiCall(() => api.get("/notes"));

export const getNoteById = (id: string): NoteResult =>
  apiCall(() => api.get(`/notes/${id}`));

export const createNote = (body: TCreateNoteBody): NoteResult =>
  apiCall(() => api.post("/notes", body));

export const updateNote = (id: string, body: TUpdateNoteBody): NoteResult =>
  apiCall(() => api.put(`/notes/${id}`, body));

export const deleteNote = (id: string): VoidResult =>
  apiCall(() => api.delete(`/notes/${id}`));
