import { sendSuccess, sendError } from "../../shared/response.js";
import * as requestDocumentService from "./requestDocument.service.js";

export async function submitRequest(req, res) {
  try {
    const studentId = req.body.studentId;
    const request = await requestDocumentService.createDocumentRequest(
      studentId,
      req.body
    );
    return sendSuccess(res, request, 201);
  } catch (error) {
    return sendError(res, error.message, error.statusCode || 500);
  }
}
