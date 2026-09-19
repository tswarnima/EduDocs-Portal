/*import crypto from "crypto";
import {
  findUserByEmail,
  findUserByStudentId,
  findUserByResetToken,
  updateUser,
} from "../../data/localStore.js";
import { createStudentToken, createPasswordResetToken } from "../../shared/tokens.js";

export async function authenticateUser(credentials) {
  const { email, password } = credentials;

  if (!email?.trim() || !password?.trim()) {
    const error = new Error("Email and password are required");
    error.statusCode = 400;
    throw error;
  }

  const user = findUserByEmail(email);

  if (!user || user.password !== password.trim()) {
    const error = new Error("Invalid email or password");
    error.statusCode = 401;
    throw error;
  }

  if (user.isActive === false) {
    const error = new Error("Your account has been deactivated. Contact the administrator.");
    error.statusCode = 403;
    throw error;
  }

  const token = createStudentToken(user);

  return {
    fullName: user.fullName,
    email: user.email,
    studentId: user.studentId,
    token,
  };
}

export async function verifyStudentSession(studentId) {
  if (!studentId?.trim()) {
    const error = new Error("Student ID is required");
    error.statusCode = 400;
    throw error;
  }

  const user = findUserByStudentId(studentId);

  if (!user || user.isActive === false) {
    const error = new Error("Invalid session");
    error.statusCode = 401;
    throw error;
  }

  return {
    fullName: user.fullName,
    email: user.email,
    studentId: user.studentId,
  };
}

export async function requestPasswordReset(email) {
  if (!email?.trim()) {
    const error = new Error("Email is required");
    error.statusCode = 400;
    throw error;
  }

  const user = findUserByEmail(email);

  if (!user) {
    return {
      message: "If an account exists with this email, a reset link has been generated.",
    };
  }

  const { token, hashedToken, expiresAt } = createPasswordResetToken();

  await updateUser(user.studentId, {
    resetPasswordToken: hashedToken,
    resetPasswordExpires: expiresAt.toISOString(),
  });

  return {
    message: "If an account exists with this email, a reset link has been generated.",
    resetToken: token,
    expiresAt,
  };
}

export async function resetPassword(token, newPassword) {
  if (!token?.trim() || !newPassword?.trim()) {
    const error = new Error("Reset token and new password are required");
    error.statusCode = 400;
    throw error;
  }

  if (newPassword.trim().length < 6) {
    const error = new Error("Password must be at least 6 characters");
    error.statusCode = 400;
    throw error;
  }

  const hashedToken = crypto.createHash("sha256").update(token.trim()).digest("hex");
  const user = findUserByResetToken(hashedToken);

  if (!user) {
    const error = new Error("Invalid or expired reset token");
    error.statusCode = 400;
    throw error;
  }

  await updateUser(user.studentId, {
    password: newPassword.trim(),
    resetPasswordToken: null,
    resetPasswordExpires: null,
  });

  return {
    message: "Password reset successful. You can now login with your new password.",
  };
}*/


import crypto from "crypto";
import User from "../../models/User.js";
import {
  createStudentToken,
  createPasswordResetToken,
} from "../../shared/tokens.js";

export async function authenticateUser(credentials) {
  const { email, password } = credentials;

  if (!email?.trim() || !password?.trim()) {
    const error = new Error("Email and password are required");
    error.statusCode = 400;
    throw error;
  }

  const user = await User.findOne({
    email: email.trim().toLowerCase(),
  });

  if (!user || user.password !== password.trim()) {
    const error = new Error("Invalid email or password");
    error.statusCode = 401;
    throw error;
  }

  if (user.isActive === false) {
    const error = new Error(
      "Your account has been deactivated. Contact the administrator."
    );
    error.statusCode = 403;
    throw error;
  }

  const token = createStudentToken(user);

  return {
    fullName: user.fullName,
    email: user.email,
    studentId: user.studentId,
    token,
  };
}

export async function verifyStudentSession(studentId) {
  if (!studentId?.trim()) {
    const error = new Error("Student ID is required");
    error.statusCode = 400;
    throw error;
  }

  const user = await User.findOne({
    studentId: studentId.trim(),
  });

  if (!user || user.isActive === false) {
    const error = new Error("Invalid session");
    error.statusCode = 401;
    throw error;
  }

  return {
    fullName: user.fullName,
    email: user.email,
    studentId: user.studentId,
  };
}

export async function requestPasswordReset(email) {
  if (!email?.trim()) {
    const error = new Error("Email is required");
    error.statusCode = 400;
    throw error;
  }

  const user = await User.findOne({
    email: email.trim().toLowerCase(),
  });

  if (!user) {
    return {
      message:
        "If an account exists with this email, a reset link has been generated.",
    };
  }

  const { token, hashedToken, expiresAt } = createPasswordResetToken();

  user.resetPasswordToken = hashedToken;
  user.resetPasswordExpires = expiresAt;

  await user.save();

  return {
    message:
      "If an account exists with this email, a reset link has been generated.",
    resetToken: token,
    expiresAt,
  };
}

export async function resetPassword(token, newPassword) {
  if (!token?.trim() || !newPassword?.trim()) {
    const error = new Error("Reset token and new password are required");
    error.statusCode = 400;
    throw error;
  }

  if (newPassword.trim().length < 6) {
    const error = new Error("Password must be at least 6 characters");
    error.statusCode = 400;
    throw error;
  }

  const hashedToken = crypto
    .createHash("sha256")
    .update(token.trim())
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken: hashedToken,
    resetPasswordExpires: { $gt: new Date() },
  });

  if (!user) {
    const error = new Error("Invalid or expired reset token");
    error.statusCode = 400;
    throw error;
  }

  user.password = newPassword.trim();
  user.resetPasswordToken = null;
  user.resetPasswordExpires = null;

  await user.save();

  return {
    message: "Password reset successful. You can now login with your new password.",
  };
}
