import { useEffect } from "react";
import { useAuthStore, useThemeStore } from "../stores";

export const useInitApp = () => {
  const { initializeAuth, status } = useAuthStore();
  const theme = useThemeStore((s) => s.theme);

  // Log in user when page mounts
  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  // Set theme from localStorage
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const isAppLoading: boolean = status === "idle" || status === "loading";

  return { isAppLoading };
};
