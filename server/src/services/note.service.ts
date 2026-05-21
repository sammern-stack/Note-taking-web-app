import { Types } from "mongoose";
import Note from "../models/Notes.js";
import { AppError } from "../utils/AppError.js";
import type { INote, TNewNote } from "../types/index.js";

export const getAllNotes = async () => {
  return Note.find();
};

export const getNoteById = async (id: string) => {
  validateId(id);

  const note = await Note.findById(id);
  if (!note) throw new AppError("Note not found", 404);

  return note;
};

export const createNote = async (data: TNewNote) => {
  const exist = await Note.findOne({ title: data.title });
  if (exist) throw new AppError("A note with the same title exists", 409);

  return Note.create(data);
};

export const updateNote = async (id: string, data: Partial<INote>) => {
  validateId(id);

  const note = await Note.findByIdAndUpdate(id, data, {
    returnDocument: "after",
    runValidators: true,
  });

  return note;
};

export const deleteNote = async (id: string) => {
  validateId(id);

  const note = await Note.findByIdAndDelete(id);
  if (!note) throw new AppError("Note not found", 404);
};

// Utility: validate note id
const validateId = (id: string) => {
  const isValidId = Types.ObjectId.isValid(id);
  if (!isValidId) throw new AppError("Invalid note ID", 400);
};
