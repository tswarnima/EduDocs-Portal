import { Router } from "express";
import { trackRequest } from "./trackRequest.controller.js";

const router = Router();

// GET /api/requests/track/:requestId
router.get("/:requestId", trackRequest);

export default router;
