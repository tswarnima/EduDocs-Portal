import { Router } from "express";
import { registerUser } from "./register.controller.js";

const router = Router();

// POST /api/register
router.post("/", registerUser);

export default router;
