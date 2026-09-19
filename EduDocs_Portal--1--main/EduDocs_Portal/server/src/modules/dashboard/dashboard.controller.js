import { sendSuccess, sendError } from "../../shared/response.js";
import * as dashboardService from "./dashboard.service.js";

export async function getDashboard(req, res) {
  try {
    const data = await dashboardService.getDashboardData(req.user.studentId);
    return sendSuccess(res, data);
  } catch (error) {
    return sendError(res, error.message, error.statusCode || 500);
  }
}
