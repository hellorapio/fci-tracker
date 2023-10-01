import dotenv from "dotenv";
dotenv.config({ path: `${__dirname}/config/.env` });
import "./types";
import app from "./app";
import config from "./config/config";

process.on("uncaughtException", (err) => {
  console.log(err.name);
  console.log(err.message);
  process.exit(1);
});
const server = app.listen(config.port, () => {
  console.log("Server is up");
});

process.on("unhandledRejection", (err: Error) => {
  console.log(err.name);
  console.log(err.message);
  server.close(() => {
    process.exit(1);
  });
});

// Listening for SIGTERM
