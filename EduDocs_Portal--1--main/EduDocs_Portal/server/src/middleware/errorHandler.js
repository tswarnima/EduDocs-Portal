import { sendError } from "../shared/response.js";

export function notFoundHandler(req, res) {
  return sendError(res, `Route not found: ${req.method} ${req.originalUrl}`, 404);
}

export function errorHandler(err, req, res, next) {
  console.error(err);
  return sendError(res, err.message || "Internal server error", err.statusCode || 500);
}
