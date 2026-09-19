/**
 * Local JSON file store for development and API testing.
 *
 * MongoDB integration note (for database teammate):
 * - Replace imports of this module in service files with Mongoose models
 *   under server/src/models/
 * - Re-enable connectDB() and seedAdmin() in server/src/server.js
 * - MongoDB files are kept intact in server/src/models/ and server/src/config/
 */

import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import config from "../config/index.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DB_PATH = path.join(__dirname, "../../data/db.json");

let db = null;
let ready = false;

function normalizeRequest(request) {
  return {
    ...request,
    requestId: request.requestId || request.id,
  };
}

function sortByCreatedAtDesc(items) {
  return [...items].sort(
    (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
  );
}

async function persist() {
  await fs.writeFile(DB_PATH, JSON.stringify(db, null, 2), "utf-8");
}

export async function initLocalStore() {
  try {
    const raw = await fs.readFile(DB_PATH, "utf-8");
    db = JSON.parse(raw);
  } catch (error) {
    if (error.code === "ENOENT") {
      db = { users: [], profiles: [], requests: [], admins: [] };
      await persist();
    } else {
      throw error;
    }
  }

  db.users = db.users || [];
  db.profiles = db.profiles || [];
  db.requests = (db.requests || []).map(normalizeRequest);
  db.admins = db.admins || [];

  if (db.admins.length === 0) {
    db.admins.push({
      id: "admin-1",
      fullName: config.adminName,
      email: config.adminEmail.toLowerCase(),
      password: config.adminPassword,
    });
    await persist();
  }

  ready = true;
  console.log(`Local data store ready: ${DB_PATH}`);
}

export function isStoreReady() {
  return ready;
}

export function getStorePath() {
  return DB_PATH;
}

// --- Users ---

export function findUserByEmail(email) {
  return db.users.find((user) => user.email === email.trim().toLowerCase()) || null;
}

export function findUserByStudentId(studentId) {
  return db.users.find((user) => user.studentId === studentId.trim()) || null;
}

export function findUserByResetToken(hashedToken) {
  const now = new Date();
  return (
    db.users.find(
      (user) =>
        user.resetPasswordToken === hashedToken &&
        user.resetPasswordExpires &&
        new Date(user.resetPasswordExpires) > now
    ) || null
  );
}

export function getAllUsers() {
  return sortByCreatedAtDesc(db.users);
}

export function countActiveUsers() {
  return db.users.filter((user) => user.isActive !== false).length;
}

export async function createUser(user) {
  const record = {
    ...user,
    isActive: user.isActive ?? true,
    resetPasswordToken: null,
    resetPasswordExpires: null,
    createdAt: new Date().toISOString(),
  };
  db.users.push(record);
  await persist();
  return record;
}

export async function updateUser(studentId, updates) {
  const index = db.users.findIndex((user) => user.studentId === studentId.trim());
  if (index === -1) return null;

  db.users[index] = { ...db.users[index], ...updates };
  await persist();
  return db.users[index];
}

// --- Profiles ---

export function findProfileByStudentId(studentId) {
  return db.profiles.find((profile) => profile.studentId === studentId.trim()) || null;
}

export function getAllProfiles() {
  return db.profiles;
}

export async function createProfile(profile) {
  db.profiles.push(profile);
  await persist();
  return profile;
}

export async function updateProfile(studentId, updates) {
  const index = db.profiles.findIndex(
    (profile) => profile.studentId === studentId.trim()
  );
  if (index === -1) return null;

  db.profiles[index] = { ...db.profiles[index], ...updates };
  await persist();
  return db.profiles[index];
}

// --- Requests ---

export function getAllRequests() {
  return sortByCreatedAtDesc(db.requests.map(normalizeRequest));
}

export function findRequestsByStudentId(studentId) {
  return sortByCreatedAtDesc(
    db.requests
      .map(normalizeRequest)
      .filter((request) => request.studentId === studentId.trim())
  );
}

export function findRequestById(requestId) {
  const normalizedId = requestId.trim();
  return (
    db.requests
      .map(normalizeRequest)
      .find(
        (request) => request.requestId.toLowerCase() === normalizedId.toLowerCase()
      ) || null
  );
}

export function countRequests(filter = {}) {
  let items = db.requests.map(normalizeRequest);

  if (filter.status) {
    items = items.filter((request) => request.status === filter.status);
  }

  return items.length;
}

export async function createRequest(request) {
  const record = normalizeRequest({
    ...request,
    createdAt: request.createdAt || new Date().toISOString(),
  });
  db.requests.push(record);
  await persist();
  return record;
}

export async function updateRequest(requestId, updates) {
  const index = db.requests.findIndex((request) => {
    const normalized = normalizeRequest(request);
    return normalized.requestId.toLowerCase() === requestId.trim().toLowerCase();
  });

  if (index === -1) return null;

  db.requests[index] = normalizeRequest({ ...db.requests[index], ...updates });
  await persist();
  return db.requests[index];
}

export function getNextRequestId() {
  const count = db.requests.length;
  return `DOC${String(count + 1).padStart(3, "0")}`;
}

// --- Admins ---

export function findAdminByEmail(email) {
  return db.admins.find((admin) => admin.email === email.trim().toLowerCase()) || null;
}
