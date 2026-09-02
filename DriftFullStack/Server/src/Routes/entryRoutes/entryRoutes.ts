import express from "express";
import verifyToken from "../../Middleware/auth.middleware.js";
import {
  createEntry,
  deleteEntry,
  getEntries,
  getSingleEntry,
} from "../../Controllers/entryControllers/entryController.js";
import app from "../../server.js";
import errorHandler from "../../Middleware/errorHandler.middleware.js";

const router = express.Router();

router.get("/", verifyToken, getEntries);
router.post("/", verifyToken, createEntry);
router.delete("/:id", verifyToken, deleteEntry);
router.get("/:id", verifyToken, getSingleEntry);

app.use(errorHandler);

export default router;
