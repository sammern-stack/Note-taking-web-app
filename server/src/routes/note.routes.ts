import { Router } from "express";

import {
  getNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote,
} from "../controllers/note.controller.js";
import { authenticate } from "../middleware/authenticate.js";

const router = Router();

router.route("/").get(authenticate, getNotes).post(authenticate, createNote);
router
  .route("/:id")
  .get(authenticate, getNoteById)
  .put(authenticate, updateNote)
  .delete(authenticate, deleteNote);

export default router;
