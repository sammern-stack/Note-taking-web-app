import type { Response } from "express";

export const sendSuccess = (
  res: Response,
  data: unknown,
  statusCode = 200,
  meta?: Record<string, unknown>,
  msg?: string,
): void => {
  const success = {
    ok: true,
    data,
    ...(meta && { meta }),
    ...(msg && { msg }),
  };

  res.status(statusCode).json(success);
};

export const sendError = (
  res: Response,
  message: string,
  statusCode = 500,
): void => {
  const failed = {
    ok: false,
    msg: message,
  };

  res.status(statusCode).json(failed);
};
