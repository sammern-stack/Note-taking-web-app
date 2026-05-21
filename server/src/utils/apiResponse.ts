import type { Response } from "express";

export const sendSuccess = (
  res: Response,
  data: unknown,
  statusCode: 200,
  meta?: Record<string, unknown>,
): void => {
  res.status(statusCode).json({
    success: true,
    data,
    ...(meta && { meta }),
  });
};

export const sendError = (
  res: Response,
  message: string,
  statusCode = 500,
): void => {
  res.status(statusCode).json({
    success: false,
    message,
  });
};
