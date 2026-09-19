import { sendSuccess, sendError } from "../../shared/response.js";
import * as loginService from "./login.service.js";

export async function loginUser(req, res) {
  try {
    const result = await loginService.authenticateUser(req.body);
    return sendSuccess(res, result);
  } catch (error) {
    return sendError(res, error.message, error.statusCode || 500);
  }
}

export async function verifySession(req, res) {
  try {
    const result = await loginService.verifyStudentSession(req.user.studentId);
    return sendSuccess(res, result);
  } catch (error) {
    return sendError(res, error.message, error.statusCode || 500);
  }
}

export async function forgotPassword(req, res) {
  try {
    const result = await loginService.requestPasswordReset(req.body.email);
    return sendSuccess(res, result);
  } catch (error) {
    return sendError(res, error.message, error.statusCode || 500);
  }
}

export async function resetPassword(req, res) {
  try {
    const { token, newPassword } = req.body;
    const result = await loginService.resetPassword(token, newPassword);
    return sendSuccess(res, result);
  } catch (error) {
    return sendError(res, error.message, error.statusCode || 500);
  }
}
