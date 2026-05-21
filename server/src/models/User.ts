import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";
import type { IUserDocument } from "../types/index.js";

const VALID_EMAIL_FORMAT = /^\S+@\S+\.\S+$/; // something@something.something

const userSchema = new Schema<IUserDocument, {}, IUserDocument>(
  {
    username: {
      type: String,
      required: [true, "username is required"],
      trim: true,
      minLength: [2, "Username cant be lower than 2 characters"],
      maxLength: [50, "Username cant exceed 50 characters"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [VALID_EMAIL_FORMAT, "Please enter a valid email"],
    },
    password: {
      type: String,
      required: [true, "password is required"],
      minLength: [8, "password must be at least 8 characters"],
      select: false,
    },
  },
  { timestamps: true },
);

// Hashing password before document is saved
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 12);
  return;
});

// Instance method to compare passwords
userSchema.methods.comparePassword = async function (
  candidatePassword: string,
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

const User = model<IUserDocument>("user", userSchema);
export default User;
