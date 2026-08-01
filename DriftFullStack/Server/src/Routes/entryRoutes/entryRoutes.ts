import express from "express";
import verifyToken from "../../Middleware/auth.middleware.js";
import { createEntry } from "../../Controllers/entryControllers/entryController.js";

const router = express.Router();

router.post("/", verifyToken, createEntry);

export default router;
