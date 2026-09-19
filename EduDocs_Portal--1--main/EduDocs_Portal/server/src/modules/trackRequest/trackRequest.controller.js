import { sendSuccess, sendError } from "../../shared/response.js";
import * as trackRequestService from "./trackRequest.service.js";

export async function trackRequest(req, res) {
  try {
    const request = await trackRequestService.findRequestById(req.params.requestId);
    return sendSuccess(res, request);
  } catch (error) {
    return sendError(res, error.message, error.statusCode || 500);
  }
}
