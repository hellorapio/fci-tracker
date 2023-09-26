import { Express } from "express";
import authRouter from "../modules/auth/auth.routes";
import errorHandler from "../middlewares/error.middleware";
import userRouter from "../modules/users/user.routes";

const routes = async (app: Express) => {
  app.use("/api/v1/auth", authRouter);
  app.use("/api/v1/users", userRouter);

  app.use("*", (req, res) => {
    res.status(404).json({
      status: "fail",
      message: "Page you are looking for is not found",
    });
  });

  app.use(errorHandler);
};

export default routes;
