import dotenv from "dotenv";
dotenv.config({ path: `${__dirname}/config/.env` });
import "./types";
import app from "./app";
import config from "./config/config";
const server = app.listen(config.port, () => {
  console.log("Server is up");
});
// Adding uncaught exceptions and unhandled rejections
