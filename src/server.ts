import dotenv from "dotenv";
dotenv.config({ path: `${__dirname}/config/.env` });
// Edit the types also
// Adding uncaught exceptions and unhandled rejections

import { s } from "./types";
import app from "./app";
import config from "./config/config";

const server = app.listen(config.port, () => {
  console.log("Server is up");
});
