import jwt from "jsonwebtoken";
import config from "../config/index.js";
import { sendError } from "../shared/response.js";

export function authenticateStudent(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return sendError(res, "Authentication required", 401);
  }

  const token = authHeader.slice(7);

  try {
    const decoded = jwt.verify(token, config.jwtSecret);

    if (decoded.role !== "student") {
      return sendError(res, "Access denied", 403);
    }

    req.user = {
      studentId: decoded.studentId,
      email: decoded.email,
      fullName: decoded.fullName,
    };

    return next();
  } catch {
    return sendError(res, "Invalid or expired session. Please login again.", 401);
  }
}

export function authenticateAdmin(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return sendError(res, "Admin authentication required", 401);
  }

  const token = authHeader.slice(7);

  try {
    const decoded = jwt.verify(token, config.jwtSecret);

    if (decoded.role !== "admin") {
      return sendError(res, "Access denied", 403);
    }

    req.admin = {
      id: decoded.id,
      email: decoded.email,
      fullName: decoded.fullName,
    };

    return next();
  } catch {
    return sendError(res, "Invalid or expired admin session. Please login again.", 401);
  }
}
