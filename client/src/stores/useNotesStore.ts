//—————————————————————————————————————————————————————————————————
// Imports
//—————————————————————————————————————————————————————————————————

import { create } from "zustand";
import { persist } from "zustand/middleware";

import { getNotes } from "../api/notesApi";
import type { INote } from "../types";

//—————————————————————————————————————————————————————————————————
// Types
//—————————————————————————————————————————————————————————————————

interface INotesStore {
  notes: INote[];
  tags: string[];
  mainFilter: "All" | "Archived";
  tagFilter: string;

  setNotes: () => Promise<void>;
}

//—————————————————————————————————————————————————————————————————
// Helper
//—————————————————————————————————————————————————————————————————

const getUniqueSortedTags = (notes: INote[]): string[] => [
  ...new Set(notes.flatMap((n) => n.tags).sort((a, b) => a.localeCompare(b))),
];

//—————————————————————————————————————————————————————————————————
// Store
//—————————————————————————————————————————————————————————————————

export const useNotesStore = create<INotesStore>()(
  persist(
    (set) => ({
      notes: [],
      tags: [],

      // Sidebar's filter options
      mainFilter: "All",
      tagFilter: "",

      setNotes: async () => {
        const res = await getNotes();
        if (!res.ok) return console.log("Error: ", res.error);

        const notes = res.data;
        const tags = getUniqueSortedTags(notes);

        set({ notes, tags });
      },
    }),
    {
      name: "sidebar",
      partialize: (s) => ({
        mainFilter: s.mainFilter,
        tagFilter: s.tagFilter,
      }),
    },
  ),
);
