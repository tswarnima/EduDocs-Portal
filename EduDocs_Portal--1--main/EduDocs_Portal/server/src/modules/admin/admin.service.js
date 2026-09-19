/*import {
  findAdminByEmail,
  getAllRequests as getAllRequestsFromStore,
  findRequestById,
  updateRequest,
  getAllUsers as getAllUsersFromStore,
  findUserByStudentId,
  findProfileByStudentId,
  findRequestsByStudentId,
  updateUser,
  getAllProfiles,
} from "../../data/localStore.js";
import { createAdminToken } from "../../shared/tokens.js";

export async function authenticateAdmin(credentials) {
  const { email, password } = credentials;

  if (!email?.trim() || !password?.trim()) {
    const error = new Error("Email and password are required");
    error.statusCode = 400;
    throw error;
  }

  const admin = findAdminByEmail(email);

  if (!admin || admin.password !== password.trim()) {
    const error = new Error("Invalid admin credentials");
    error.statusCode = 401;
    throw error;
  }

  const token = createAdminToken(admin);

  return {
    fullName: admin.fullName,
    email: admin.email,
    token,
  };
}

export async function getAllRequests() {
  const requests = getAllRequestsFromStore();

  return requests.map((item) => ({
    id: item.requestId,
    studentId: item.studentId,
    document: item.document,
    documentType: item.documentType,
    semester: item.semester,
    purpose: item.purpose,
    notes: item.notes,
    status: item.status,
    date: item.date,
    submittedOn: item.submittedOn,
    expectedDelivery: item.expectedDelivery,
  }));
}

export async function getRequestById(requestId) {
  if (!requestId?.trim()) {
    const error = new Error("Request ID is required");
    error.statusCode = 400;
    throw error;
  }

  const request = findRequestById(requestId);

  if (!request) {
    const error = new Error("Request not found");
    error.statusCode = 404;
    throw error;
  }

  const profile = findProfileByStudentId(request.studentId);

  return {
    id: request.requestId,
    studentId: request.studentId,
    studentName: profile?.name || "Unknown",
    studentEmail: profile?.email || "",
    document: request.document,
    documentType: request.documentType,
    semester: request.semester,
    purpose: request.purpose,
    notes: request.notes,
    status: request.status,
    date: request.date,
    submittedOn: request.submittedOn,
    expectedDelivery: request.expectedDelivery,
  };
}

export async function updateRequestStatus(requestId, status) {
  const allowedStatuses = ["Pending", "Approved", "Rejected"];

  if (!requestId?.trim()) {
    const error = new Error("Request ID is required");
    error.statusCode = 400;
    throw error;
  }

  if (!allowedStatuses.includes(status)) {
    const error = new Error("Status must be Pending, Approved, or Rejected");
    error.statusCode = 400;
    throw error;
  }

  const request = await updateRequest(requestId, { status });

  if (!request) {
    const error = new Error("Request not found");
    error.statusCode = 404;
    throw error;
  }

  return {
    id: request.requestId,
    status: request.status,
    message: `Request ${status.toLowerCase()} successfully`,
  };
}

export async function getAllUsers() {
  const users = getAllUsersFromStore();
  const profiles = getAllProfiles();
  const profileMap = new Map(profiles.map((p) => [p.studentId, p]));

  return users.map((user) => {
    const profile = profileMap.get(user.studentId);

    return {
      studentId: user.studentId,
      fullName: profile?.name || user.fullName,
      email: user.email,
      department: profile?.department || "",
      semester: profile?.semester || "",
      phone: profile?.phone || "",
      isActive: user.isActive !== false,
      registeredAt: user.createdAt,
    };
  });
}

export async function getUserById(studentId) {
  if (!studentId?.trim()) {
    const error = new Error("Student ID is required");
    error.statusCode = 400;
    throw error;
  }

  const user = findUserByStudentId(studentId);

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  const profile = findProfileByStudentId(user.studentId);
  const requests = findRequestsByStudentId(user.studentId);

  return {
    studentId: user.studentId,
    fullName: profile?.name || user.fullName,
    email: user.email,
    department: profile?.department || "",
    semester: profile?.semester || "",
    phone: profile?.phone || "",
    isActive: user.isActive !== false,
    registeredAt: user.createdAt,
    requests: requests.map((item) => ({
      id: item.requestId,
      document: item.document,
      status: item.status,
      date: item.date,
    })),
  };
}

export async function updateUserStatus(studentId, isActive) {
  if (!studentId?.trim()) {
    const error = new Error("Student ID is required");
    error.statusCode = 400;
    throw error;
  }

  if (typeof isActive !== "boolean") {
    const error = new Error("isActive must be a boolean value");
    error.statusCode = 400;
    throw error;
  }

  const user = await updateUser(studentId, { isActive });

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  return {
    studentId: user.studentId,
    isActive: user.isActive,
    message: isActive ? "User activated successfully" : "User deactivated successfully",
  };
}*/



import Admin from "../../models/Admin.js";
import User from "../../models/User.js";
import Profile from "../../models/Profile.js";
import Request from "../../models/Request.js";

import { createAdminToken } from "../../shared/tokens.js";


export async function authenticateAdmin(credentials) {
  const { email, password } = credentials;

  if (!email?.trim() || !password?.trim()) {
    const error = new Error("Email and password are required");
    error.statusCode = 400;
    throw error;
  }

  const admin = await Admin.findOne({
    email: email.toLowerCase().trim(),
  });

  if (!admin || admin.password !== password.trim()) {
    const error = new Error("Invalid admin credentials");
    error.statusCode = 401;
    throw error;
  }

  const token = createAdminToken(admin);

  return {
    fullName: admin.fullName,
    email: admin.email,
    token,
  };
}


export async function getAllRequests() {

  const requests = await Request.find();

  return requests.map((item) => ({
    id: item.requestId,
    studentId: item.studentId,
    document: item.document,
    documentType: item.documentType,
    semester: item.semester,
    purpose: item.purpose,
    notes: item.notes,
    status: item.status,
    date: item.date,
    submittedOn: item.submittedOn,
    expectedDelivery: item.expectedDelivery,
  }));
}


export async function getRequestById(requestId) {

  if (!requestId?.trim()) {
    const error = new Error("Request ID is required");
    error.statusCode = 400;
    throw error;
  }

  const request = await Request.findOne({
    requestId,
  });


  if (!request) {
    const error = new Error("Request not found");
    error.statusCode = 404;
    throw error;
  }


  const profile = await Profile.findOne({
    studentId: request.studentId,
  });


  return {
    id: request.requestId,
    studentId: request.studentId,
    studentName: profile?.name || "Unknown",
    studentEmail: profile?.email || "",

    document: request.document,
    documentType: request.documentType,
    semester: request.semester,
    purpose: request.purpose,
    notes: request.notes,

    status: request.status,

    date: request.date,
    submittedOn: request.submittedOn,
    expectedDelivery: request.expectedDelivery,
  };
}



export async function updateRequestStatus(requestId, status) {

  const allowedStatuses = [
    "Pending",
    "Approved",
    "Rejected",
  ];


  if (!requestId?.trim()) {
    const error = new Error("Request ID is required");
    error.statusCode = 400;
    throw error;
  }


  if (!allowedStatuses.includes(status)) {
    const error = new Error(
      "Status must be Pending, Approved, or Rejected"
    );

    error.statusCode = 400;
    throw error;
  }


  const request = await Request.findOneAndUpdate(
    {
      requestId,
    },
    {
      status,
    },
    {
      new: true,
    }
  );


  if (!request) {
    const error = new Error("Request not found");
    error.statusCode = 404;
    throw error;
  }


  return {
    id: request.requestId,
    status: request.status,
    message: `Request ${status.toLowerCase()} successfully`,
  };
}




export async function getAllUsers() {

  const users = await User.find();

  const profiles = await Profile.find();


  const profileMap = new Map(
    profiles.map((p) => [
      p.studentId,
      p
    ])
  );


  return users.map((user) => {

    const profile = profileMap.get(
      user.studentId
    );


    return {

      studentId: user.studentId,

      fullName:
        profile?.name ||
        user.fullName,

      email: user.email,


      department:
        profile?.department ||
        "",


      semester:
        profile?.semester ||
        "",


      phone:
        profile?.phone ||
        "",


      isActive:
        user.isActive !== false,


      registeredAt:
        user.createdAt,
    };

  });

}




export async function getUserById(studentId) {

  if (!studentId?.trim()) {

    const error = new Error(
      "Student ID is required"
    );

    error.statusCode = 400;

    throw error;
  }



  const user = await User.findOne({
    studentId,
  });



  if (!user) {

    const error = new Error(
      "User not found"
    );

    error.statusCode = 404;

    throw error;
  }



  const profile = await Profile.findOne({
    studentId: user.studentId,
  });



  const requests = await Request.find({
    studentId: user.studentId,
  });



  return {

    studentId: user.studentId,


    fullName:
      profile?.name ||
      user.fullName,


    email: user.email,


    department:
      profile?.department ||
      "",


    semester:
      profile?.semester ||
      "",


    phone:
      profile?.phone ||
      "",


    isActive:
      user.isActive !== false,


    registeredAt:
      user.createdAt,


    requests:
      requests.map((item) => ({

        id: item.requestId,

        document: item.document,

        status: item.status,

        date: item.date,

      }))

  };

}




export async function updateUserStatus(studentId, isActive) {

  if (!studentId?.trim()) {

    const error = new Error(
      "Student ID is required"
    );

    error.statusCode = 400;

    throw error;

  }



  if (typeof isActive !== "boolean") {

    const error = new Error(
      "isActive must be a boolean value"
    );

    error.statusCode = 400;

    throw error;

  }



  const user = await User.findOneAndUpdate(

    {
      studentId,
    },

    {
      isActive,
    },

    {
      new: true,
    }

  );



  if (!user) {

    const error = new Error(
      "User not found"
    );

    error.statusCode = 404;

    throw error;

  }



  return {

    studentId: user.studentId,

    isActive: user.isActive,


    message:
      isActive
        ? "User activated successfully"
        : "User deactivated successfully",

  };

}
