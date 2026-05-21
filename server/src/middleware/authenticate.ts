import type { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../utils/jwt.js";
import User from "../models/User.js";
import { AppError } from "../utils/AppError.js";

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer "))
    return next(new AppError("Access token required", 401));

  const token = authHeader.split(" ")[1];

  if (!token) return next(new AppError("Access token required", 401));

  try {
    const payload = verifyAccessToken(token);

    const user = await User.findById(payload.userId).select("-password");
    if (!user) return next(new AppError("User not found", 401));

    req.user = user;
    next();
  } catch {
    next(new AppError("Invalid or expired access token", 401));
  }
};
