import type { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError.js";

export const errorHandler = (
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction, // We need all 4 params for Express to understand that is an error handler
): void => {
  // Errors thrown by AppError.ts
  if (error instanceof AppError) {
    res.status(error.statusCode).json({
      ok: false,
      msg: error.message,
    });
    return;
  }

  // Mongoose duplicate key error
  if (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    (error as { code: number }).code === 11000
  ) {
    res.status(409).json({
      ok: false,
      msg: "A record with that value already exists",
    });
  }

  // Mongoose validation error
  if (error instanceof Error && error.name === "ValidationError") {
    res.status(400).json({
      ok: false,
      msg: error.message,
    });
    return;
  }

  // Mongoose bad ObjectId
  if (error instanceof Error && error.name === "CastError") {
    res.status(400).json({
      ok: false,
      msg: "Invalid ID format",
    });
    return;
  }

  // Unknown errors
  console.log("Unexpected error:", error);
  res.status(500).json({
    ok: false,
    msg:
      process.env.NODE_ENV === "production"
        ? "Something when wrong"
        : error instanceof Error
          ? error.message
          : "Unknown error",
  });
};
