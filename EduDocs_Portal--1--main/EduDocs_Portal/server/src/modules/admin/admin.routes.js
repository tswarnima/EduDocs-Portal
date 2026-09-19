import { Router } from "express";
import {
  loginAdmin,
  listRequests,
  getRequestDetails,
  updateRequestStatus,
  listUsers,
  getUserDetails,
  updateUserStatus,
} from "./admin.controller.js";
import { authenticateAdmin } from "../../middleware/auth.js";

const router = Router();

router.post("/login", loginAdmin);

router.get("/requests", authenticateAdmin, listRequests);
router.get("/requests/:requestId", authenticateAdmin, getRequestDetails);
router.patch("/requests/:requestId/status", authenticateAdmin, updateRequestStatus);

router.get("/users", authenticateAdmin, listUsers);
router.get("/users/:studentId", authenticateAdmin, getUserDetails);
router.patch("/users/:studentId/status", authenticateAdmin, updateUserStatus);

export default router;
