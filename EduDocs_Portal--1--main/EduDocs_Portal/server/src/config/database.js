import mongoose from "mongoose";
import config from "./index.js";

mongoose.set("strictQuery", true);

export async function connectDB() {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  try {
    await mongoose.connect(config.mongoUri, {
      serverSelectionTimeoutMS: 5000,
    });

    // console.log(`MongoDB connected: ${config.mongoUri}`);
    console.log("MongoDB Atlas Connected");
    return mongoose.connection;
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    console.error(
      "Check that MongoDB is running and MONGODB_URI in server/.env is correct."
    );
    console.error(`Current URI: ${config.mongoUri}`);
    throw error;
  }
}

export default connectDB;
