import { Express } from "express";

import errorHandler from "../middlewares/error.middleware";
import AppError from "../error/appError";

import authRouter from "../modules/auth/auth.routes";
import userRouter from "../modules/users/user.routes";
import todoRouter from "../modules/todos/todos.routes";

const routes = async (app: Express) => {
  app.use("/api/v1/auth", authRouter);
  app.use("/api/v1/users", userRouter);
  app.use("/api/v1/todos", todoRouter);

  app.use("*", (req, res) => {
    throw new AppError("Page you are looking for is not found", 404);
  });

  app.use(errorHandler);
};

export default routes;
