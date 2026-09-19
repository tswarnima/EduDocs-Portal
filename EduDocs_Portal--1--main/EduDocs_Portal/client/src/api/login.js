import request from "./client";

export function loginUser(credentials) {
  return request("/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  });
}

export function verifySession() {
  return request("/login/verify");
}

export function forgotPassword(email) {
  return request("/login/forgot-password", {
    method: "POST",
    body: JSON.stringify({ email }),
  });
}

export function resetPassword(token, newPassword) {
  return request("/login/reset-password", {
    method: "POST",
    body: JSON.stringify({ token, newPassword }),
  });
}
