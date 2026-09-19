import { initLocalStore } from "./data/localStore.js";
import connectDB from "./config/database.js";
import app from "./app.js";
import config from "./config/index.js";


async function startServer() {
  await connectDB();
  await initLocalStore();


  const server = app.listen(config.port, () => {
    console.log(`Server running on http://localhost:${config.port}`);
    console.log(`API base URL: http://localhost:${config.port}/api`);
    console.log(`Frontend URL: ${config.clientUrl}`);
    // console.log("Data source: server/data/db.json (local mock — MongoDB not required)");
  });

  server.on("error", (error) => {
    if (error.code === "EADDRINUSE") {
      console.error(
        `Port ${config.port} is already in use.\n` +
        `Stop the other process with:\n` +
        `  netstat -ano | findstr :${config.port}\n` +
        `  taskkill /PID <pid> /F\n` +
        `Or change PORT in server/.env`
      );
    } else {
      console.error("Server failed to start:", error.message);
    }

    process.exit(1);
  });

  const shutdown = (signal) => {
    console.log(`\n${signal} received. Shutting down...`);
    server.close(() => process.exit(0));
  };

  process.on("SIGINT", () => shutdown("SIGINT"));
  process.on("SIGTERM", () => shutdown("SIGTERM"));
}

startServer().catch((error) => {
  console.error("Failed running 'src/server.js':", error.message);
  process.exit(1);
});
