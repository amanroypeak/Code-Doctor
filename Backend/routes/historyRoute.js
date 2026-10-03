import express from "express";
import { getMyScans, getScanById } from "../controllers/historyController.js";
import { requireAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", requireAuth, getMyScans);

router.get("/:id", requireAuth, getScanById);

export default router;