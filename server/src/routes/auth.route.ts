// src/routes/authRoutes.ts
import { Router } from "express";
import {
  register,
  login,
  refresh,
  logout,
  logoutAll,
  getMe,
  forgotPassword,
  resetPassword,
} from "../controllers/auth.controller.js";
import { authenticate } from "../middleware/authenticate.js";

const router = Router();

// Public routes
router.post("/register", register);
router.post("/login", login);
router.post("/refresh", refresh);
router.post("/logout", logout);
router.post("/forgot-pw", forgotPassword);
router.post("/reset-pw", resetPassword);

// Protected routes
router.post("/logout-all", authenticate, logoutAll);
router.get("/me", authenticate, getMe);

export default router;
