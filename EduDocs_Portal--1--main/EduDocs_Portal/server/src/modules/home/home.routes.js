import { Router } from "express";
import { getHomeContent } from "./home.controller.js";

const router = Router();

// GET /api/home
router.get("/", getHomeContent);

export default router;
