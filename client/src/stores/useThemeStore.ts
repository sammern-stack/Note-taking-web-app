import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { TVoidFn } from "../types";

type Theme = "light" | "dark";

interface IThemeState {
  theme: Theme;
  toggleTheme: TVoidFn;
}

export const useThemeStore = create<IThemeState>()(
  persist(
    (set, get) => ({
      theme: "light",
      toggleTheme: () =>
        set({ theme: get().theme === "light" ? "dark" : "light" }),
    }),
    { name: "theme" },
  ),
);
