import { fetchApi } from "./util";
import api from "./axios";

import type {
  NoteResult,
  NotesResult,
  TCreateNoteBody,
  TUpdateNoteBody,
  VoidResult,
} from "../types";

export const getNotes = (): NotesResult => fetchApi(() => api.get("/notes"));

export const getNoteById = (id: string): NoteResult =>
  fetchApi(() => api.get(`/notes/${id}`));

export const createNote = (body: TCreateNoteBody): NoteResult =>
  fetchApi(() => api.post("/notes", body));

export const updateNote = (id: string, body: TUpdateNoteBody): NoteResult =>
  fetchApi(() => api.put(`/notes/${id}`, body));

export const deleteNote = (id: string): VoidResult =>
  fetchApi(() => api.delete(`/notes/${id}`));
