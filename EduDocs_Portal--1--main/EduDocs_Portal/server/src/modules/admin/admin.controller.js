import { sendSuccess, sendError } from "../../shared/response.js";
import * as adminService from "./admin.service.js";

export async function loginAdmin(req, res) {
  try {
    const result = await adminService.authenticateAdmin(req.body);
    return sendSuccess(res, result);
  } catch (error) {
    return sendError(res, error.message, error.statusCode || 500);
  }
}

export async function listRequests(req, res) {
  try {
    const requests = await adminService.getAllRequests();
    return sendSuccess(res, requests);
  } catch (error) {
    return sendError(res, error.message, error.statusCode || 500);
  }
}

export async function getRequestDetails(req, res) {
  try {
    const request = await adminService.getRequestById(req.params.requestId);
    return sendSuccess(res, request);
  } catch (error) {
    return sendError(res, error.message, error.statusCode || 500);
  }
}

export async function updateRequestStatus(req, res) {
  try {
    const result = await adminService.updateRequestStatus(
      req.params.requestId,
      req.body.status
    );
    return sendSuccess(res, result);
  } catch (error) {
    return sendError(res, error.message, error.statusCode || 500);
  }
}

export async function listUsers(req, res) {
  try {
    const users = await adminService.getAllUsers();
    return sendSuccess(res, users);
  } catch (error) {
    return sendError(res, error.message, error.statusCode || 500);
  }
}

export async function getUserDetails(req, res) {
  try {
    const user = await adminService.getUserById(req.params.studentId);
    return sendSuccess(res, user);
  } catch (error) {
    return sendError(res, error.message, error.statusCode || 500);
  }
}

export async function updateUserStatus(req, res) {
  try {
    const result = await adminService.updateUserStatus(
      req.params.studentId,
      req.body.isActive
    );
    return sendSuccess(res, result);
  } catch (error) {
    return sendError(res, error.message, error.statusCode || 500);
  }
}
