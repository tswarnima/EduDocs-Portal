/*import { findRequestsByStudentId } from "../../data/localStore.js";

export async function getUserRequestHistory(studentId) {
  if (!studentId?.trim()) {
    const error = new Error("Student ID is required");
    error.statusCode = 400;
    throw error;
  }

  const requests = findRequestsByStudentId(studentId);

  return requests.map((item) => ({
    id: item.requestId,
    document: item.document,
    date: item.date,
    status: item.status,
  }));
}*/

import Request from "../../models/Request.js";

export async function getUserRequestHistory(studentId) {
  if (!studentId?.trim()) {
    const error = new Error("Student ID is required");
    error.statusCode = 400;
    throw error;
  }

  const requests = await Request.find({
    studentId: studentId.trim(),
  }).sort({ createdAt: -1 });

  return requests.map((item) => ({
    id: item.requestId,
    document: item.document,
    date: item.date,
    status: item.status,
  }));
}