import Admin from "../models/Admin.js";
import config from "./index.js";

export default async function seedAdmin() {
  const existing = await Admin.findOne({ email: config.adminEmail.toLowerCase() });

  if (existing) {
    return;
  }

  await Admin.create({
    fullName: config.adminName,
    email: config.adminEmail.toLowerCase(),
    password: config.adminPassword,
  });

  console.log(`Default admin account created: ${config.adminEmail}`);
}
