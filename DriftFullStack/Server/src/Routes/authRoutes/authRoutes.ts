import express from "express";
import {
  login,
  register,
} from "../../Controllers/authControllers/authController.js";
import app from "../../server.js";
import errorHandler from "../../Middleware/errorHandler.middleware.js";

const router = express.Router();

//authRoutes
router.post("/register", register);
router.post("/login", login);

app.use(errorHandler);

export default router;
