/*import {
  findUserByStudentId,
  findProfileByStudentId,
  findRequestsByStudentId,
} from "../../data/localStore.js";

export async function getDashboardData(studentId) {
  if (!studentId?.trim()) {
    const error = new Error("Student ID is required");
    error.statusCode = 400;
    throw error;
  }

  const normalizedId = studentId.trim();
  const user = findUserByStudentId(normalizedId);
  const profile = findProfileByStudentId(normalizedId);
  const requests = findRequestsByStudentId(normalizedId);

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  const statusCounts = requests.reduce(
    (acc, item) => {
      acc[item.status] = (acc[item.status] || 0) + 1;
      return acc;
    },
    { Pending: 0, Approved: 0, Rejected: 0 }
  );

  const recentRequests = requests.slice(0, 5).map((item) => ({
    id: item.requestId,
    document: item.document,
    status: item.status,
    date: item.date,
  }));

  return {
    welcomeMessage: `Welcome Back, ${profile?.name || user.fullName}!`,
    student: {
      fullName: profile?.name || user.fullName,
      studentId: user.studentId,
      email: user.email,
    },
    stats: {
      total: requests.length,
      ...statusCounts,
    },
    recentRequests,
    quickLinks: [
      "request-document",
      "track-request",
      "request-history",
      "profile",
    ],
  };
}*/


import User from "../../models/User.js";
import Profile from "../../models/Profile.js";
import Request from "../../models/Request.js";

export async function getDashboardData(studentId) {
  if (!studentId?.trim()) {
    const error = new Error("Student ID is required");
    error.statusCode = 400;
    throw error;
  }

  const normalizedId = studentId.trim();

  // Fetch user
  const user = await User.findOne({ studentId: normalizedId });

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  // Fetch profile
  const profile = await Profile.findOne({
    studentId: normalizedId,
  });

  // Fetch all requests of the student
  const requests = await Request.find({
    studentId: normalizedId,
  }).sort({ createdAt: -1 });

  // Count request statuses
  const statusCounts = requests.reduce(
    (acc, item) => {
      acc[item.status] = (acc[item.status] || 0) + 1;
      return acc;
    },
    {
      Pending: 0,
      Approved: 0,
      Rejected: 0,
    }
  );

  // Recent 5 requests
  const recentRequests = requests.slice(0, 5).map((item) => ({
    id: item.requestId,
    document: item.document,
    status: item.status,
    date: item.date,
  }));

  return {
    welcomeMessage: `Welcome Back, ${profile?.name || user.fullName}!`,
    student: {
      fullName: profile?.name || user.fullName,
      studentId: user.studentId,
      email: user.email,
    },
    stats: {
      total: requests.length,
      ...statusCounts,
    },
    recentRequests,
    quickLinks: [
      "request-document",
      "track-request",
      "request-history",
      "profile",
    ],
  };
}
