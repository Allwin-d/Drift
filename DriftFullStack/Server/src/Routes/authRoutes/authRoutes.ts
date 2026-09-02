import express from "express";
import {
  login,
  register,
} from "../../Controllers/authControllers/authController.js";
import rateLimiter from "../../Middleware/rateLimiter.middleware.js";

const router = express.Router();

//authRoutes
router.post("/register", register);
router.post("/login", rateLimiter, login);

export default router;
