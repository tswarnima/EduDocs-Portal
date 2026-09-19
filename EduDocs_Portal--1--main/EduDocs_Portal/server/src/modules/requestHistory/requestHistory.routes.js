import { Router } from "express";
import { getRequestHistory } from "./requestHistory.controller.js";

const router = Router();

// GET /api/requests/history
router.get("/", getRequestHistory);

export default router;
