//—————————————————————————————————————————————————————————————————
// Imports
//—————————————————————————————————————————————————————————————————

import type { Request, Response } from "express";
import * as noteService from "../services/note.service.js";

import { asyncHandler } from "../utils/asyncHandler.js";
import { sendSuccess } from "../utils/apiResponse.js";
import { AppError } from "../utils/AppError.js";

import type { TUpdateNoteBody, TCreateNoteBody } from "../types/index.js";

//—————————————————————————————————————————————————————————————————
// Types
//—————————————————————————————————————————————————————————————————

interface IFiltersQuery {
  isArchived?: boolean;
  tag?: string;
}

//—————————————————————————————————————————————————————————————————
// Note Services
//—————————————————————————————————————————————————————————————————

export const getNotes = asyncHandler(
  async (req: Request<{}, {}, {}, IFiltersQuery>, res: Response) => {
    const notes = await noteService.getNotes(req.query);
    sendSuccess(res, notes, 200);
  },
);

export const getNoteById = asyncHandler(
  async (req: Request<{ id?: string }>, res: Response) => {
    const { id } = req.params;
    if (!id) throw new AppError("Invalid or missing note ID", 400);

    const note = await noteService.getNoteById(id);
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
  async (req: Request<{ id?: string }, {}, TUpdateNoteBody>, res: Response) => {
    const { id } = req.params;
    if (!id) throw new AppError("Invalid or missing note ID", 400);

    const note = await noteService.updateNote(id, req.body);
    sendSuccess(res, note, 200);
  },
);

export const deleteNote = asyncHandler(
  async (req: Request<{ id?: string }>, res: Response) => {
    const { id } = req.params;
    if (!id) throw new AppError("Invalid or missing note ID", 400);

    await noteService.deleteNote(id);
    sendSuccess(res, {}, 200, {}, "Note deleted");
  },
);
