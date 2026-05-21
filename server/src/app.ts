import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import noteRoutes from "./routes/note.routes.js";
import authRoutes from "./routes/auth.route.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { config } from "./config/env.js";

const app = express();

// Middleware
app.use(
  cors({
    origin: config.clientURL,
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/notes", noteRoutes);

// Error handling
app.use(errorHandler);

export default app;
