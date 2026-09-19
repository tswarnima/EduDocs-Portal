import { getNextRequestId } from "../data/localStore.js";

export function formatDate(date) {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function createRequestId() {
  return getNextRequestId();
}
