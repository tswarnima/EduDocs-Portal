import request from "./client";

export function registerUser(userData) {
  return request("/register", {
    method: "POST",
    body: JSON.stringify({
      fullName: userData.fullName,
      email: userData.email,
      studentId: userData.studentId,
      password: userData.password,
    }),
  });
}
