//—————————————————————————————————————————————————————————————————
// Imports
//—————————————————————————————————————————————————————————————————

import type { Request, Response } from "express";

import * as authService from "../services/auth.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { sendSuccess } from "../utils/apiResponse.js";
import {
  setRefreshTokenCookie,
  clearRefreshTokenCookie,
  REFRESH_TOKEN_COOKIE,
} from "../utils/cookie.js";
import { AppError } from "../utils/AppError.js";

import type { RegisterBody, LoginBody, ResetPw } from "../types/index.js";

//—————————————————————————————————————————————————————————————————
// Authentication Services
//—————————————————————————————————————————————————————————————————

export const register = asyncHandler(
  async (req: Request<{}, {}, RegisterBody>, res: Response) => {
    const { user, accessToken, refreshToken } = await authService.register(
      req.body,
    );

    setRefreshTokenCookie(res, refreshToken);
    sendSuccess(res, { user, accessToken }, 201);
  },
);

export const login = asyncHandler(
  async (req: Request<{}, {}, LoginBody>, res: Response) => {
    const { user, accessToken, refreshToken } = await authService.login(
      req.body,
    );

    setRefreshTokenCookie(res, refreshToken);
    sendSuccess(res, { user, accessToken }, 200);
  },
);

export const refresh = asyncHandler(async (req: Request, res: Response) => {
  const incomingRefreshToken = req.cookies[REFRESH_TOKEN_COOKIE];
  if (!incomingRefreshToken)
    throw new AppError("No refresh token provided", 401);

  const { user, accessToken, refreshToken } =
    await authService.refresh(incomingRefreshToken);

  setRefreshTokenCookie(res, refreshToken);
  sendSuccess(res, { user, accessToken }, 200);
});

export const logout = asyncHandler(async (req: Request, res: Response) => {
  const refreshToken = req.cookies[REFRESH_TOKEN_COOKIE];
  if (refreshToken) await authService.logout(refreshToken);

  clearRefreshTokenCookie(res);

  sendSuccess(res, {}, 200, {}, "Logged out successfully");
});

export const logoutAll = asyncHandler(async (req: Request, res: Response) => {
  await authService.logoutAll(req.user!._id.toString());
  clearRefreshTokenCookie(res);
  sendSuccess(res, {}, 200, {}, "Logged out from all devices");
});

export const getMe = asyncHandler(async (req: Request, res: Response) => {
  sendSuccess(res, req.user, 200);
});

export const forgotPassword = asyncHandler(
  async (req: Request<{}, {}, { email: string }>, res: Response) => {
    const token = await authService.forgotPassword(req.body.email);
    sendSuccess(res, token, 200);
  },
);

export const resetPassword = asyncHandler(
  async (req: Request<{}, {}, ResetPw>, res: Response) => {
    const { token, newPassword, confirmPassword } = req.body;
    await authService.resetPassword(token, newPassword, confirmPassword);
    sendSuccess(res, "Password updated", 200);
  },
);
