import { create } from "zustand";
import type { IUser } from "../types";
import {
  loginRequest,
  registerRequest,
  refreshRequest,
  logoutRequest,
  logoutAllRequest,
} from "../api/authApi";
import { setAccessToken } from "../api/axios";
import type { LoginCredentials, RegisterData } from "../api/authApi";

type AuthStatus = "idle" | "loading" | "authenticated" | "unauthenticated";

interface AuthState {
  user: IUser | null;
  status: AuthStatus;

  // Actions
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  logoutAll: () => Promise<void>;
  initializeAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  status: "idle",

  // Call it once at app mount
  initializeAuth: async () => {
    set({ status: "loading" });
    try {
      const res = await refreshRequest();

      if (!res.ok) {
        setAccessToken(null);
        set({ user: null, status: "unauthenticated" });
        return;
      }

      const { data } = res;

      setAccessToken(data.accessToken);
      set({ user: data.user, status: "authenticated" });
    } catch {
      setAccessToken(null);
      set({ user: null, status: "unauthenticated" });
    }
  },

  login: async (credentials) => {
    const res = await loginRequest(credentials);

    if (!res.ok) {
      setAccessToken(null);
      set({ user: null, status: "unauthenticated" });
      return;
    }

    const { data } = res;

    setAccessToken(data.accessToken);
    set({ user: data.user, status: "authenticated" });
  },

  register: async (registerData) => {
    const res = await registerRequest(registerData);

    if (!res.ok) {
      setAccessToken(null);
      set({ user: null, status: "unauthenticated" });
      return;
    }

    const { data } = res;

    setAccessToken(data.accessToken);
    set({ user: data.user, status: "authenticated" });
  },

  logout: async () => {
    try {
      await logoutRequest();
    } finally {
      setAccessToken(null);
      set({ user: null, status: "unauthenticated" });
    }
  },

  logoutAll: async () => {
    try {
      await logoutAllRequest();
    } finally {
      setAccessToken(null);
      set({ user: null, status: "unauthenticated" });
    }
  },
}));

window.addEventListener("auth:logout", () => {
  useAuthStore.setState({ user: null, status: "unauthenticated" });
});
