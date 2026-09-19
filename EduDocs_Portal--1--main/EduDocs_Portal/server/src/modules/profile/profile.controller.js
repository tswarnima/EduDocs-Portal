import { sendSuccess, sendError } from "../../shared/response.js";
import * as profileService from "./profile.service.js";

export async function getProfile(req, res) {
  try {
    const studentId = req.query.studentId;
    const profile = await profileService.getUserProfile(studentId);
    return sendSuccess(res, profile);
  } catch (error) {
    return sendError(res, error.message, error.statusCode || 500);
  }
}

export async function updateProfile(req, res) {
  try {
    const studentId = req.query.studentId;
    const profile = await profileService.updateUserProfile(studentId, req.body);
    return sendSuccess(res, profile);
  } catch (error) {
    return sendError(res, error.message, error.statusCode || 500);
  }
}
