import express from "express";
import cors from "cors";
import config from "./config/index.js";
import apiRoutes from "./routes/index.js";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler.js";
import { isStoreReady, getStorePath } from "./data/localStore.js";

const app = express();

app.use(
  cors({
    origin: config.clientUrl,
    credentials: true,
  })
);
app.use(express.json());

app.get("/health", (req, res) => {
  const storeReady = isStoreReady();

  res.status(storeReady ? 200 : 503).json({
    success: storeReady,
    message: storeReady
      ? "EduDocs Portal API is running"
      : "API is up but local data store is not ready",
    database: "json-file (local mock)",
    dataFile: getStorePath(),
    apiBaseUrl: "/api",
  });
});

app.use("/api", apiRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
