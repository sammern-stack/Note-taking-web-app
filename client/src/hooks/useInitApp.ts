import { useEffect } from "react";
import { useAuthStore } from "../stores/useAuthStore";

export const useInitApp = () => {
  const { initializeAuth, status } = useAuthStore();

  // Log in user when page mounts
  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  const isAppLoading: boolean = status === "idle" || status === "loading";

  return { isAppLoading };
};
