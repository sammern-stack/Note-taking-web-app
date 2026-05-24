import { create } from "zustand";
import { setAccessToken } from "../api/axios";

import {
  loginUser,
  registerUser,
  refreshJWT,
  forgotUserPswd,
  resetUserPswd,
  logoutUser,
  logoutAllUser,
} from "../api/authApi";

import type {
  IUser,
  AuthResult,
  AuthResponseData,
  TAsyncVoidFn,
} from "../types";
import type { TLogin, TRegister, TReset } from "../api/authApi";

interface AuthState {
  user: IUser | null;
  status: "idle" | "loading" | "authenticated" | "unauthenticated";
  resetToken: string | null;

  // Actions
  login: (info: TLogin) => AuthResult;
  register: (info: TRegister) => AuthResult;
  forgot: (email: string) => void;
  reset: (data: TReset) => void;
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
  resetToken: null,

  // Call it once at app mount
  initializeAuth: async () => {
    set({ status: "loading" });
    const res = await refreshJWT();
    res.ok ? get().authUser(res.data) : get().unauthUser();
  },

  login: async (info) => {
    const res = await loginUser(info);
    if (res.ok) get().authUser(res.data);
    return res;
  },

  register: async (info) => {
    const res = await registerUser(info);
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

  forgot: async (email) => forgotUserPswd(email),
  reset: async (data) => resetUserPswd(data),

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
