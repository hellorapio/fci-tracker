import "express-async-errors";
import express from "express";
import connectDB from "./core/db";
import middlewares from "./core/middlewares";
import routes from "./core/routes";

const app = express();

connectDB();
middlewares(app);
routes(app);

export default app;
