import { Express } from "express";
import authRouter from "../modules/auth/auth.routes";

const routes = async (app: Express) => {
  app.use("/api/v1/auth", authRouter);

  app.use("*", (req, res, next) => {
    res.status(404).json({
      status: "fail",
      message: "Page you are looking for is not found",
    });
  });
};

export default routes;
