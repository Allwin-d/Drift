import express from "express";
import verifyToken from "../../Middleware/auth.middleware.js";
import {
  createEntry,
  deleteEntry,
  getEntries,
  getEntriesNearby,
  getSingleEntry,
} from "../../Controllers/entryControllers/entryController.js";

const router = express.Router();

router.get("/", verifyToken, getEntries);
router.post("/", verifyToken, createEntry);
router.get("/nearby", verifyToken, getEntriesNearby);
router.delete("/:id", verifyToken, deleteEntry);
router.get("/:id", verifyToken, getSingleEntry);

export default router;
