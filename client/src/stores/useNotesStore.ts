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

type MainFilter = "All" | "Archived";

interface INotesStore {
  notes: INote[];
  tags: string[];

  // Sidebar filters
  mainFilter: MainFilter;
  setMainFilter: (filter: MainFilter) => void;

  tagFilter: string;
  setTagFilter: (tag: string) => void;

  // Actions
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
      setMainFilter: (mainFilter) => set({ mainFilter }),

      tagFilter: "",
      setTagFilter: (tagFilter) => set({ tagFilter }),

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
