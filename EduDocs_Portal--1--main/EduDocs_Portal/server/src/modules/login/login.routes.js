import { Router } from "express";
import {
  loginUser,
  verifySession,
  forgotPassword,
  resetPassword,
} from "./login.controller.js";
import { authenticateStudent } from "../../middleware/auth.js";

const router = Router();

router.post("/", loginUser);
router.get("/verify", authenticateStudent, verifySession);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

export default router;
