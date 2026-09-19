import { sendSuccess, sendError } from "../../shared/response.js";
import * as registerService from "./register.service.js";

export async function registerUser(req, res) {
  try {
    const user = await registerService.createUser(req.body);
    return sendSuccess(res, user, 201);
  } catch (error) {
    return sendError(res, error.message, error.statusCode || 500);
  }
}
