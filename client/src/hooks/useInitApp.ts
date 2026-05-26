import { useEffect } from "react";
import { useAuthStore, useThemeStore, useNotesStore } from "../stores";

export const useInitApp = () => {
  const { initializeAuth, status, user } = useAuthStore();
  const theme = useThemeStore((s) => s.theme);
  const setNotes = useNotesStore((s) => s.setNotes);

  const noteSelected = useNotesStore((s) => s.noteSelected);
  const setActiveNote = useNotesStore((s) => s.setActiveNote);

  // Log in user when page mounts
  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  // Set theme from localStorage
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    if (user) setNotes(); // Load notes when user logs in
    if (user && noteSelected !== "") setActiveNote(noteSelected);
  }, [user, noteSelected]);

  const isAppLoading: boolean = status === "idle" || status === "loading";

  return { isAppLoading };
};
