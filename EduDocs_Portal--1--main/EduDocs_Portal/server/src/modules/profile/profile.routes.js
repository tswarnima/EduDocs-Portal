import { Router } from "express";
import { getProfile, updateProfile } from "./profile.controller.js";

const router = Router();

// GET /api/profile
router.get("/", getProfile);

// PUT /api/profile
router.put("/", updateProfile);

export default router;
