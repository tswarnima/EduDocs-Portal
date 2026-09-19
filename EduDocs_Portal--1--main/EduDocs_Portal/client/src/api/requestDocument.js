import request from "./client";

export function submitDocumentRequest(studentId, requestData) {
  return request("/requests", {
    method: "POST",
    body: JSON.stringify({
      studentId,
      ...requestData,
    }),
  });
}
