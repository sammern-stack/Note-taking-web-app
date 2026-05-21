import { Schema, model } from "mongoose";
import type { IRefreshToken } from "../types/index.js";

const refreshTokenSchema = new Schema<IRefreshToken>(
  {
    token: {
      type: String,
      require: true,
      unique: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true },
);

// Auto-delete expired tokens — MongoDB TTL index
refreshTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const RefreshToken = model<IRefreshToken>("refreshToken", refreshTokenSchema);
export default RefreshToken;
