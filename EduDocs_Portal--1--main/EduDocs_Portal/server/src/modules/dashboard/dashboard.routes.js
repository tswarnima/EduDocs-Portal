import { Router } from "express";
import { getDashboard } from "./dashboard.controller.js";
import { authenticateStudent } from "../../middleware/auth.js";

const router = Router();

router.get("/", authenticateStudent, getDashboard);

export default router;
