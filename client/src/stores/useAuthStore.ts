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
  AuthResult,
  AuthResponseData,
  TAsyncVoidFn,
} from "../types";

interface AuthState {
  user: IUser | null;
  status: "idle" | "loading" | "authenticated" | "unauthenticated";

  // Actions
  login: (credentials: LoginCredentials) => AuthResult;
  register: (data: RegisterData) => AuthResult;
  logout: TAsyncVoidFn;
  logoutAll: TAsyncVoidFn;
  initializeAuth: TAsyncVoidFn;

  // Helper
  authUser: (data: AuthResponseData) => void;
  unauthUser: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  status: "idle",

  // Call it once at app mount
  initializeAuth: async () => {
    set({ status: "loading" });
    const res = await refreshJWT();
    res.ok ? get().authUser(res.data) : get().unauthUser();
  },

  login: async (credentials) => {
    const res = await loginUser(credentials);
    if (res.ok) get().authUser(res.data);
    return res;
  },

  register: async (data) => {
    const res = await registerUser(data);
    if (res.ok) get().authUser(res.data);
    return res;
  },

  logout: async () => {
    try {
      await logoutUser();
    } finally {
      get().unauthUser();
    }
  },

  logoutAll: async () => {
    try {
      await logoutAllUser();
    } finally {
      get().unauthUser();
    }
  },

  authUser: (data) => {
    setAccessToken(data.accessToken);
    set({ user: data.user, status: "authenticated" });
  },

  unauthUser: () => {
    setAccessToken(null);
    set({ user: null, status: "unauthenticated" });
  },
}));

window.addEventListener("auth:logout", () => {
  useAuthStore.setState({ user: null, status: "unauthenticated" });
});
