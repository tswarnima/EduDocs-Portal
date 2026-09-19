import request from "./client";

// Owner: Colleague — Dashboard page backend integration
export function getDashboardSummary() {
  return request("/dashboard", { auth: "student" });
}
