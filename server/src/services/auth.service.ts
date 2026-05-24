import User from "../models/User.js";
import RefreshToken from "../models/RefreshToken.js";
import { AppError } from "../utils/AppError.js";
import {
  generateAccessToken,
  generateRefreshToken,
  generateResetToken,
  verifyRefreshToken,
  verifyResetToken,
  getRefreshTokenExpiry,
} from "../utils/jwt.js";
import type { RegisterData, LoginData, AuthTokens } from "../types/index.js";

const generateTokens = async (userId: string): Promise<AuthTokens> => {
  const accessToken = generateAccessToken({ userId });
  const refreshToken = generateRefreshToken({ userId });

  await RefreshToken.create({
    token: refreshToken,
    user: userId,
    expiresAt: getRefreshTokenExpiry(),
  });

  return { accessToken, refreshToken };
};

export const register = async (data: RegisterData) => {
  const userExist = await User.findOne({ email: data.email });
  if (userExist)
    throw new AppError("An account with this email already exists", 409);

  const user = await User.create(data);
  const tokens = await generateTokens(user._id.toString());

  return {
    user: {
      _id: user._id,
      username: user.username,
      email: user.email,
    },
    ...tokens,
  };
};

export const login = async (data: LoginData) => {
  const user = await User.findOne({ email: data.email }).select("+password");
  if (!user) throw new AppError("Invalid email or password", 401);

  const isPasswordCorrect = await user.comparePassword(data.password);
  if (!isPasswordCorrect) throw new AppError("Invalid email or password", 401);

  const tokens = await generateTokens(user._id.toString());

  return {
    user: {
      _id: user._id,
      username: user.username,
      email: user.email,
    },
    ...tokens,
  };
};

export const refresh = async (incomingRefreshToken: string) => {
  const payload = verifyRefreshToken(incomingRefreshToken);

  const storedToken = await RefreshToken.findOne({
    token: incomingRefreshToken,
  });

  if (!storedToken) throw new AppError("Invalid refresh token", 401);

  const user = await User.findById(payload.userId);
  if (!user) throw new AppError("User not found", 401);

  await RefreshToken.deleteOne({ _id: storedToken._id });

  const tokens = await generateTokens(user._id.toString());

  return {
    user: {
      _id: user._id,
      username: user.username,
      email: user.email,
    },
    ...tokens,
  };
};

export const logout = async (refreshToken: string) => {
  await RefreshToken.deleteOne({ token: refreshToken });
};

export const logoutAll = async (userId: string) => {
  await RefreshToken.deleteMany({ user: userId });
};

export const forgotPassword = async (email: string) => {
  const user = await User.findOne({ email });
  if (!user) throw new AppError("User not found with this email", 404);

  const token = generateResetToken({ userId: user._id.toString() });
  return token;
};

export const resetPassword = async (
  token: string,
  newPassword: string,
  confirmPassword: string,
) => {
  if (newPassword !== confirmPassword)
    throw new AppError("Password don't match", 400);

  const payload = verifyResetToken(token);
  const user = await User.findById(payload.userId);
  if (!user) throw new AppError("User not found", 404);

  user.password = newPassword;
  await user.save();
  return true;
};
