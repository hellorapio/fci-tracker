import { Request, Response, NextFunction } from "express";
import AppError from "../error/appError";
import config from "../config/config";

const sendErrorDev = (err: AppError, res: Response) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    stack: err.stack,
    err,
  });
};

const sendErrorProd = (err: AppError, res: Response) => {
  if (err.isOperational)
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  else
    res
      .status(500)
      .json({ status: "error", message: "Something went Wrong" });
};

const errorHandling = async (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "err";
  if (config.env === "dev") sendErrorDev(err, res);
  else {
    sendErrorProd(err, res);
  }
};

export default errorHandling;
