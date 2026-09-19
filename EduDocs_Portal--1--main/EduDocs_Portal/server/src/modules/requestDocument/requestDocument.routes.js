import { Router } from "express";
import { submitRequest } from "./requestDocument.controller.js";

const router = Router();

// POST /api/requests
router.post("/", submitRequest);

export default router;
