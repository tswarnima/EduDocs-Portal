import request from "./client";

export function trackRequestById(requestId) {
  return request(`/requests/track/${encodeURIComponent(requestId)}`);
}
