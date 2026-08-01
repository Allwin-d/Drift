import express from "express";
import {
  login,
  register,
} from "../../Controllers/authControllers/authController.js";

const router = express.Router();

//authRoutes
router.post("/register",register);
router.post("/login", login);

export default router;
