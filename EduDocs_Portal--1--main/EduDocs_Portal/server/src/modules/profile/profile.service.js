/*import { findProfileByStudentId, updateProfile as saveProfile } from "../../data/localStore.js";
import { validatePhone } from "../../shared/validators.js";

export async function getUserProfile(studentId) {
  if (!studentId?.trim()) {
    const error = new Error("Student ID is required");
    error.statusCode = 400;
    throw error;
  }

  const profile = findProfileByStudentId(studentId);

  if (!profile) {
    const error = new Error("Profile not found");
    error.statusCode = 404;
    throw error;
  }

  return {
    name: profile.name,
    studentId: profile.studentId,
    email: profile.email,
    department: profile.department,
    semester: profile.semester,
    phone: profile.phone,
  };
}

export async function updateUserProfile(studentId, profileData) {
  if (!studentId?.trim()) {
    const error = new Error("Student ID is required");
    error.statusCode = 400;
    throw error;
  }

  const profile = findProfileByStudentId(studentId);

  if (!profile) {
    const error = new Error("Profile not found");
    error.statusCode = 404;
    throw error;
  }

  const phoneValidation = validatePhone(profileData.phone);
  if (!phoneValidation.valid) {
    const error = new Error(phoneValidation.message);
    error.statusCode = 400;
    throw error;
  }

  const updated = await saveProfile(studentId, {
    name: profileData.name?.trim() || profile.name,
    email: profileData.email?.trim() || profile.email,
    department: profileData.department?.trim() || "",
    semester: profileData.semester?.trim() || "",
    phone: phoneValidation.value,
  });

  return {
    name: updated.name,
    studentId: updated.studentId,
    email: updated.email,
    department: updated.department,
    semester: updated.semester,
    phone: updated.phone,
  };
}*/


import Profile from "../../models/Profile.js";
import { validatePhone } from "../../shared/validators.js";

export async function getUserProfile(studentId) {
  if (!studentId?.trim()) {
    const error = new Error("Student ID is required");
    error.statusCode = 400;
    throw error;
  }

  const profile = await Profile.findOne({
    studentId: studentId.trim(),
  });

  if (!profile) {
    const error = new Error("Profile not found");
    error.statusCode = 404;
    throw error;
  }

  return {
    name: profile.name,
    studentId: profile.studentId,
    email: profile.email,
    department: profile.department,
    semester: profile.semester,
    phone: profile.phone,
  };
}

export async function updateUserProfile(studentId, profileData) {
  if (!studentId?.trim()) {
    const error = new Error("Student ID is required");
    error.statusCode = 400;
    throw error;
  }

  const profile = await Profile.findOne({
    studentId: studentId.trim(),
  });

  if (!profile) {
    const error = new Error("Profile not found");
    error.statusCode = 404;
    throw error;
  }

  const phoneValidation = validatePhone(profileData.phone);

  if (!phoneValidation.valid) {
    const error = new Error(phoneValidation.message);
    error.statusCode = 400;
    throw error;
  }

  profile.name = profileData.name?.trim() || profile.name;
  profile.email = profileData.email?.trim() || profile.email;
  profile.department = profileData.department?.trim() || "";
  profile.semester = profileData.semester?.trim() || "";
  profile.phone = phoneValidation.value;

  await profile.save();

  return {
    name: profile.name,
    studentId: profile.studentId,
    email: profile.email,
    department: profile.department,
    semester: profile.semester,
    phone: profile.phone,
  };
}
