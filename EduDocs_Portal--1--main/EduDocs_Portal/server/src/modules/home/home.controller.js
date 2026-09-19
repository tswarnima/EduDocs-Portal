import { sendSuccess, sendError } from "../../shared/response.js";
import * as homeService from "./home.service.js";

export async function getHomeContent(req, res) {
  try {
    const content = await homeService.getHomePageContent();
    return sendSuccess(res, content);
  } catch (error) {
    return sendError(res, error.message, error.statusCode || 500);
  }
}
