/*import {
  findUserByEmail,
  findUserByStudentId,
  createUser as createUserRecord,
  createProfile,
} from "../../data/localStore.js";

export async function createUser(userData) {
  const { fullName, email, studentId, password } = userData;

  if (!fullName?.trim() || !email?.trim() || !studentId?.trim() || !password?.trim()) {
    const error = new Error("All fields are required");
    error.statusCode = 400;
    throw error;
  }

  const normalizedEmail = email.trim().toLowerCase();
  const normalizedStudentId = studentId.trim();

  if (findUserByEmail(normalizedEmail)) {
    const error = new Error("Email is already registered");
    error.statusCode = 400;
    throw error;
  }

  if (findUserByStudentId(normalizedStudentId)) {
    const error = new Error("Student ID is already registered");
    error.statusCode = 400;
    throw error;
  }

  const newUser = await createUserRecord({
    fullName: fullName.trim(),
    email: normalizedEmail,
    studentId: normalizedStudentId,
    password: password.trim(),
  });

  await createProfile({
    studentId: newUser.studentId,
    name: newUser.fullName,
    email: newUser.email,
    department: "",
    semester: "",
    phone: "",
  });

  return {
    fullName: newUser.fullName,
    email: newUser.email,
    studentId: newUser.studentId,
  };
}*/

import User from "../../models/User.js";
import Profile from "../../models/Profile.js";

export async function createUser(userData) {
  const { fullName, email, studentId, password } = userData;

  if (!fullName?.trim() || !email?.trim() || !studentId?.trim() || !password?.trim()) {
    const error = new Error("All fields are required");
    error.statusCode = 400;
    throw error;
  }

  const normalizedEmail = email.trim().toLowerCase();
  const normalizedStudentId = studentId.trim();

  const existingEmail = await User.findOne({
    email: normalizedEmail,
  });

  if (existingEmail) {
    const error = new Error("Email is already registered");
    error.statusCode = 400;
    throw error;
  }

  const existingStudent = await User.findOne({
    studentId: normalizedStudentId,
  });

  if (existingStudent) {
    const error = new Error("Student ID is already registered");
    error.statusCode = 400;
    throw error;
  }

  const newUser = await User.create({
    fullName: fullName.trim(),
    email: normalizedEmail,
    studentId: normalizedStudentId,
    password: password.trim(),
  });

  await Profile.create({
    studentId: newUser.studentId,
    name: newUser.fullName,
    email: newUser.email,
    department: "",
    semester: "",
    phone: "",
  });

  return {
    fullName: newUser.fullName,
    email: newUser.email,
    studentId: newUser.studentId,
  };
}
