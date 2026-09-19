import { sendSuccess, sendError } from "../../shared/response.js";
import * as requestHistoryService from "./requestHistory.service.js";

export async function getRequestHistory(req, res) {
  try {
    const studentId = req.query.studentId;
    const history = await requestHistoryService.getUserRequestHistory(studentId);
    return sendSuccess(res, history);
  } catch (error) {
    return sendError(res, error.message, error.statusCode || 500);
  }
}
