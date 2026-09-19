import request from "./client";

// Owner: Colleague — Home page backend integration
export function getHomeContent() {
  return request("/home");
}
