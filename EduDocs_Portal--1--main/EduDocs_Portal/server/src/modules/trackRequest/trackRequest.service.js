/*import { findRequestById as findRequestInStore } from "../../data/localStore.js";

export async function findRequestById(requestId) {
  if (!requestId?.trim()) {
    const error = new Error("Request ID is required");
    error.statusCode = 400;
    throw error;
  }

  const found = findRequestInStore(requestId);

  if (!found) {
    const error = new Error("No request found with this Request ID");
    error.statusCode = 404;
    throw error;
  }

  return {
    id: found.requestId,
    document: found.document,
    status: found.status,
    submittedOn: found.submittedOn,
    expectedDelivery: found.expectedDelivery,
  };
}*/


import Request from "../../models/Request.js";

export async function findRequestById(requestId) {
  if (!requestId?.trim()) {
    const error = new Error("Request ID is required");
    error.statusCode = 400;
    throw error;
  }

  const found = await Request.findOne({
    requestId: requestId.trim(),
  });

  if (!found) {
    const error = new Error("No request found with this Request ID");
    error.statusCode = 404;
    throw error;
  }

  return {
    id: found.requestId,
    document: found.document,
    status: found.status,
    submittedOn: found.submittedOn,
    expectedDelivery: found.expectedDelivery,
  };
}
