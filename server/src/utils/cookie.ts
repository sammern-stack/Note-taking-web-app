import type { Response } from "express";
import { config } from "../config/env.js";

export const REFRESH_TOKEN_COOKIE = "refreshToken";

export const setRefreshTokenCookie = (res: Response, token: string): void => {
  res.cookie(REFRESH_TOKEN_COOKIE, token, {
    httpOnly: true, // --------------------------------- Not accessible via JS
    secure: config.isProduction, // -------------------- HTTPS only in production
    sameSite: config.isProduction ? "strict" : "lax", // Protects from CSRF attacks
    maxAge: 7 * 24 * 60 * 60 * 1000, // ---------------- 7 days in milliseconds
    path: "/api/auth", // ------------------------------ Cookies only send in auth routes
  });
};

export const clearRefreshTokenCookie = (res: Response): void => {
  res.clearCookie(REFRESH_TOKEN_COOKIE, {
    httpOnly: true,
    secure: config.isProduction,
    sameSite: config.isProduction ? "strict" : "lax",
    path: "/api/auth",
  });
};
