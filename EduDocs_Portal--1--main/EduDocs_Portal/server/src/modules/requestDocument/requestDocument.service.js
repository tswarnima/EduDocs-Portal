/*import {
  findUserByStudentId,
  findRequestById,
  createRequest,
  getNextRequestId,
} from "../../data/localStore.js";
import { formatDate } from "../../shared/helpers.js";

export async function createDocumentRequest(studentId, requestData) {
  const { documentType, semester, purpose, notes } = requestData;

  if (!studentId?.trim()) {
    const error = new Error("Please register first");
    error.statusCode = 400;
    throw error;
  }

  if (!documentType || !semester || !purpose?.trim()) {
    const error = new Error("Document type, semester, and purpose are required");
    error.statusCode = 400;
    throw error;
  }

  const userExists = findUserByStudentId(studentId.trim());

  if (!userExists) {
    const error = new Error("User not found. Please register first");
    error.statusCode = 404;
    throw error;
  }

  const createdAt = new Date();
  const requestId = getNextRequestId();

  const newRequest = await createRequest({
    requestId,
    studentId: studentId.trim(),
    document: documentType,
    documentType,
    semester,
    purpose: purpose.trim(),
    notes: notes?.trim() || "",
    status: "Pending",
    date: formatDate(createdAt),
    submittedOn: formatDate(createdAt),
    expectedDelivery: formatDate(new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)),
    createdAt: createdAt.toISOString(),
  });

  return {
    id: newRequest.requestId,
    studentId: newRequest.studentId,
    document: newRequest.document,
    documentType: newRequest.documentType,
    semester: newRequest.semester,
    purpose: newRequest.purpose,
    notes: newRequest.notes,
    status: newRequest.status,
    date: newRequest.date,
    submittedOn: newRequest.submittedOn,
    expectedDelivery: newRequest.expectedDelivery,
    createdAt: newRequest.createdAt,
  };
}*/



import User from "../../models/User.js";
import Request from "../../models/Request.js";
import { formatDate } from "../../shared/helpers.js";

export async function createDocumentRequest(studentId, requestData) {

  const { documentType, semester, purpose, notes } = requestData;

  if (!studentId?.trim()) {
    const error = new Error("Please register first");
    error.statusCode = 400;
    throw error;
  }

  if (!documentType || !semester || !purpose?.trim()) {
    const error = new Error(
      "Document type, semester, and purpose are required"
    );
    error.statusCode = 400;
    throw error;
  }

  const userExists = await User.findOne({
    studentId: studentId.trim(),
  });

  if (!userExists) {
    const error = new Error("User not found. Please register first");
    error.statusCode = 404;
    throw error;
  }

  const createdAt = new Date();

  // Generate next request ID (DOC001, DOC002, ...)
  const lastRequest = await Request.findOne().sort({ createdAt: -1 });

  let requestId = "DOC001";

  if (lastRequest) {
    const lastNumber = parseInt(
      lastRequest.requestId.replace("DOC", ""),
      10
    );

    requestId = `DOC${String(lastNumber + 1).padStart(3, "0")}`;
  }

  const newRequest = await Request.create({
    requestId,
    studentId: studentId.trim(),
    document: documentType,
    documentType,
    semester,
    purpose: purpose.trim(),
    notes: notes?.trim() || "",
    status: "Pending",
    date: formatDate(createdAt),
    submittedOn: formatDate(createdAt),
    expectedDelivery: formatDate(
      new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
    ),
  });









  return {
    id: newRequest.requestId,
    studentId: newRequest.studentId,
    document: newRequest.document,
    documentType: newRequest.documentType,
    semester: newRequest.semester,
    purpose: newRequest.purpose,
    notes: newRequest.notes,
    status: newRequest.status,
    date: newRequest.date,
    submittedOn: newRequest.submittedOn,
    expectedDelivery: newRequest.expectedDelivery,
    createdAt: newRequest.createdAt,
  };
}
