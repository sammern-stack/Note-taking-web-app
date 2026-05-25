import { useEffect } from "react";
import { useAuthStore, useThemeStore, useNotesStore } from "../stores";

export const useInitApp = () => {
  const { initializeAuth, status, user } = useAuthStore();
  const theme = useThemeStore((s) => s.theme);
  const setNotes = useNotesStore((s) => s.setNotes);

  // Log in user when page mounts
  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  // Set theme from localStorage
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    if (user) setNotes();
  }, [user]);

  const isAppLoading: boolean = status === "idle" || status === "loading";

  return { isAppLoading };
};
