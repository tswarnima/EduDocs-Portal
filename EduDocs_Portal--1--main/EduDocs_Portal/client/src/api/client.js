const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

import { getStudentToken, getAdminToken } from "./auth";

function getAuthToken() {
  return getStudentToken() || getAdminToken();
}

async function request(endpoint, options = {}) {
  const { auth = "auto", ...fetchOptions } = options;

  let token = null;
  if (auth === "student") {
    token = getStudentToken();
  } else if (auth === "admin") {
    token = getAdminToken();
  } else if (auth === "auto") {
    token = getAuthToken();
  }

  const headers = {
    "Content-Type": "application/json",
    ...fetchOptions.headers,
  };

  if (token && !headers.Authorization) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...fetchOptions,
    headers,
  });

  const result = await response.json().catch(() => ({}));

  if (!response.ok) {
    const message = result.message || "Something went wrong. Please try again.";
    throw new Error(message);
  }

  return result.data;
}

export default request;
