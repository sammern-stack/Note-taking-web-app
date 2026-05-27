import { useEffect } from "react";
import { useAuthStore, useThemeStore, useNotesStore } from "../stores";

export const useInitApp = () => {
  const { initializeAuth, status, user } = useAuthStore();
  const theme = useThemeStore((s) => s.theme);

  const fetchAllNotes = useNotesStore((s) => s.fetchAllNotes);
  const fetchArchivedNotes = useNotesStore((s) => s.fetchArchivedNotes);

  const noteSelected = useNotesStore((s) => s.noteSelected);
  const setActiveNote = useNotesStore((s) => s.setActiveNote);

  const mainFilter = useNotesStore((s) => s.mainFilter);

  // Log in user when page mounts
  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  // Set theme from localStorage
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    const isAll = mainFilter === "All";
    const isArchived = mainFilter === "Archived";

    if (user && isAll) fetchAllNotes();
    if (user && isArchived) fetchArchivedNotes();

    if (user && noteSelected !== "") setActiveNote(noteSelected);
  }, [
    user,
    noteSelected,
    setActiveNote,
    fetchAllNotes,
    fetchArchivedNotes,
    mainFilter,
  ]);

  const isAppLoading: boolean = status === "idle" || status === "loading";

  return { isAppLoading };
};
