import express from "express";
import noteRoutes from "./routes/note.routes.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/api/notes", noteRoutes);

// Error handling
app.use(errorHandler);

export default app;
