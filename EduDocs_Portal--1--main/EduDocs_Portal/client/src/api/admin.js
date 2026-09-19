import request from "./client";

export function loginAdmin(credentials) {
  return request("/admin/login", {
    method: "POST",
    auth: "none",
    body: JSON.stringify(credentials),
  });
}

export function getAdminRequests() {
  return request("/admin/requests", { auth: "admin" });
}

export function getAdminRequestDetails(requestId) {
  return request(`/admin/requests/${requestId}`, { auth: "admin" });
}

export function updateAdminRequestStatus(requestId, status) {
  return request(`/admin/requests/${requestId}/status`, {
    method: "PATCH",
    auth: "admin",
    body: JSON.stringify({ status }),
  });
}

export function getAdminUsers() {
  return request("/admin/users", { auth: "admin" });
}

export function getAdminUserDetails(studentId) {
  return request(`/admin/users/${studentId}`, { auth: "admin" });
}

export function updateAdminUserStatus(studentId, isActive) {
  return request(`/admin/users/${studentId}/status`, {
    method: "PATCH",
    auth: "admin",
    body: JSON.stringify({ isActive }),
  });
}
