//@ts-ignore
import xss from "xss-clean";
//@ts-ignore
import hpp from "hpp";
import express, { Express } from "express";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import sanitize from "express-mongo-sanitize";
import morgan from "morgan";
import config from "../config/config";

const middlewares = async (app: Express) => {
  app.use(helmet());

  if (config.env === "dev") app.use(morgan("dev"));

  const limiter = rateLimit({
    max: 200,
    windowMs: 60 * 60 * 1000,
    message: "You have exceeded Requests per hour",
  });

  app.use("/api", limiter);

  app.use(
    express.json({
      limit: "10kb",
    })
  );

  app.use(sanitize());
  app.use(xss());
  app.use(hpp());
};

export default middlewares;
