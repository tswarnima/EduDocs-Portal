import jwt from "jsonwebtoken";
import crypto from "crypto";
import config from "../config/index.js";

export function createStudentToken(user) {
  return jwt.sign(
    {
      role: "student",
      studentId: user.studentId,
      email: user.email,
      fullName: user.fullName,
    },
    config.jwtSecret,
    { expiresIn: "7d" }
  );
}

export function createAdminToken(admin) {
  return jwt.sign(
    {
      role: "admin",
      id: admin._id?.toString?.() || admin.id || admin.email,
      email: admin.email,
      fullName: admin.fullName,
    },
    config.jwtSecret,
    { expiresIn: "1d" }
  );
}

export function createPasswordResetToken() {
  const token = crypto.randomBytes(32).toString("hex");
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  return {
    token,
    hashedToken,
    expiresAt: new Date(Date.now() + 60 * 60 * 1000),
  };
}
