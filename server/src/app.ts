import express from "express";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();

// Middleware
app.use(express.json());

// Error handling
app.use(errorHandler);

export default app;
