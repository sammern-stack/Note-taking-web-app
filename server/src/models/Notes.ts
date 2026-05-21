import { Schema, model } from "mongoose";
import type { INote } from "../types/index.js";

const noteSchema = new Schema<INote>(
  {
    title: {
      type: String,
      trim: true,
      default: "Untitled Note",
    },
    tags: {
      type: [String],
      default: [],
    },
    content: String,
    isArchived: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

const Note = model<INote>("note", noteSchema);
export default Note;
