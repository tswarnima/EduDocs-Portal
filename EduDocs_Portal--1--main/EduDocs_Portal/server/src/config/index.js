import dotenv from "dotenv";

dotenv.config();

const config = {
  port: process.env.PORT || 5000,
  clientUrl: process.env.CLIENT_URL || "http://localhost:5173",
  mongoUri: process.env.MONGODB_URI,//|| "mongodb://127.0.0.1:27017/edudocs_portal",
  jwtSecret: process.env.JWT_SECRET || "edudocs-dev-secret-change-in-production",
  adminEmail: process.env.ADMIN_EMAIL || "admin@edudocs.edu",
  adminPassword: process.env.ADMIN_PASSWORD || "Admin@123",
  adminName: process.env.ADMIN_NAME || "Portal Admin",
};

export default config;
