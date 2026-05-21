import type { Request, Response } from "express";
import * as noteService from "../services/note.service.js";

import { asyncHandler } from "../utils/asyncHandler.js";
import { sendSuccess } from "../utils/apiResponse.js";
import { AppError } from "../utils/AppError.js";

import type {
  INoteParams,
  TUpdateNoteBody,
  TCreateNoteBody,
} from "../types/index.js";

export const getNotes = asyncHandler(async (req: Request, res: Response) => {
  const notes = await noteService.getAllNotes();
  sendSuccess(res, notes, 200);
});

export const getNoteById = asyncHandler(
  async (req: Request<INoteParams>, res: Response) => {
    if (!req.params.id) throw new AppError("Invalid or missing note ID", 400);
    const note = await noteService.getNoteById(req.params.id);
    sendSuccess(res, note, 200);
  },
);

export const createNote = asyncHandler(
  async (req: Request<{}, {}, TCreateNoteBody>, res: Response) => {
    const note = await noteService.createNote(req.body);
    sendSuccess(res, note, 201);
  },
);

export const updateNote = asyncHandler(
  async (req: Request<INoteParams, {}, TUpdateNoteBody>, res: Response) => {
    if (!req.params.id) throw new AppError("Invalid or missing note ID", 400);
    const note = await noteService.updateNote(req.params.id, req.body);
    sendSuccess(res, note, 200);
  },
);

export const deleteNote = asyncHandler(
  async (req: Request<INoteParams>, res: Response) => {
    if (!req.params.id) throw new AppError("Invalid or missing note ID", 400);
    await noteService.deleteNote(req.params.id);
    sendSuccess(res, {}, 200, {}, "Note deleted");
  },
);
