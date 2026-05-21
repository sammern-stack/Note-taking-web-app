import mongoose from "mongoose";
import { config } from "./env.js";

export const connectDB = async (): Promise<void> => {
  try {
    const conn = await mongoose.connect(config.mongodbURI);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.log("MongoDB connection failed", error);
    process.exit(1);
  }
};
