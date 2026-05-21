import jwt from "jsonwebtoken";
import { config } from "../config/env.js";
import type {
  IAccessTokenPayload,
  IRefreshTokenPayload,
} from "../types/index.js";

export const generateAccessToken = (payload: IAccessTokenPayload): string => {
  return jwt.sign(payload, config.accessTokenSecret, {
    expiresIn: config.accessTokenExpiry,
  } as jwt.SignOptions);
};

export const generateRefreshToken = (payload: IRefreshTokenPayload): string => {
  return jwt.sign(payload, config.refreshTokenSecret, {
    expiresIn: config.refreshTokenExpiry,
  } as jwt.SignOptions);
};

export const verifyAccessToken = (token: string): IAccessTokenPayload => {
  return jwt.verify(token, config.accessTokenSecret) as IAccessTokenPayload;
};

export const verifyRefreshToken = (token: string): IRefreshTokenPayload => {
  return jwt.verify(token, config.refreshTokenSecret) as IRefreshTokenPayload;
};

// Helper: get refresh token expire date
export const getRefreshTokenExpiry = (): Date => {
  const days = parseInt(config.refreshTokenExpiry.replace("d", ""));
  return new Date(Date.now() + days * 24 * 60 * 60 * 1000);
};
