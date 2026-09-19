import request from "./client";

export function getProfile(studentId) {
  return request(`/profile?studentId=${encodeURIComponent(studentId)}`);
}

export function updateProfile(studentId, profileData) {
  return request(`/profile?studentId=${encodeURIComponent(studentId)}`, {
    method: "PUT",
    body: JSON.stringify(profileData),
  });
}
