import express from "express";
import verifyToken from "../../Middleware/auth.middleware.js";
import {
  createEntry,
  getEntries,
} from "../../Controllers/entryControllers/entryController.js";

const router = express.Router();

router.get("/", verifyToken, getEntries);
router.post("/", verifyToken, createEntry);

export default router;
