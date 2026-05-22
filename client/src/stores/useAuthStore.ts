import { create } from "zustand";
import { setAccessToken } from "../api/axios";

import {
  loginUser,
  registerUser,
  refreshJWT,
  logoutUser,
  logoutAllUser,
} from "../api/authApi";

import type {
  LoginCredentials,
  RegisterData,
  IUser,
  AuthStatus,
  AuthResult,
  AuthAction,
} from "../types";

interface AuthState {
  user: IUser | null;
  status: AuthStatus;

  // Actions
  login: (credentials: LoginCredentials) => AuthResult;
  register: (data: RegisterData) => AuthResult;
  logout: AuthAction;
  logoutAll: AuthAction;
  initializeAuth: AuthAction;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  status: "idle",

  // Call it once at app mount
  initializeAuth: async () => {
    set({ status: "loading" });
    try {
      const res = await refreshJWT();

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
    const res = await loginUser(credentials);

    if (!res.ok) {
      setAccessToken(null);
      set({ user: null, status: "unauthenticated" });
      return res;
    }

    const { data } = res;
    setAccessToken(data.accessToken);
    set({ user: data.user, status: "authenticated" });
    return res;
  },

  register: async (registerData) => {
    const res = await registerUser(registerData);

    if (!res.ok) {
      setAccessToken(null);
      set({ user: null, status: "unauthenticated" });
      return res;
    }

    const { data } = res;
    setAccessToken(data.accessToken);
    set({ user: data.user, status: "authenticated" });
    return res;
  },

  logout: async () => {
    try {
      await logoutUser();
    } finally {
      setAccessToken(null);
      set({ user: null, status: "unauthenticated" });
    }
  },

  logoutAll: async () => {
    try {
      await logoutAllUser();
    } finally {
      setAccessToken(null);
      set({ user: null, status: "unauthenticated" });
    }
  },
}));

window.addEventListener("auth:logout", () => {
  useAuthStore.setState({ user: null, status: "unauthenticated" });
});
