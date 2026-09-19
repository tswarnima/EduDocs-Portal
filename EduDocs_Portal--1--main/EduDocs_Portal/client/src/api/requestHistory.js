import request from "./client";

export function getRequestHistory(studentId) {
  return request(`/requests/history?studentId=${encodeURIComponent(studentId)}`);
}
