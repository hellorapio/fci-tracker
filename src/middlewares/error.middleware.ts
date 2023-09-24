import { Request, Response, NextFunction } from "express";
import AppError from "../error/appError";
import config from "../config/config";

const sendErrorDev = (err: AppError, res: Response) => {
  if (err.isOperational)
    res.status(err.statusCode).json({
      status: err.status,
      stack: err.stack,
      err,
      message: err.message,
    });
  else res.status(500).json({ err });
};

const sendErrorProd = (err: AppError, res: Response) => {
  if (err.isOperational)
    res.status(err.statusCode).json({
      status: err.status,
      stack: err.stack,
      err,
      message: err.message,
    });
  else res.status(500).json({ err });
};

const errorHandling = async (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (config.env === "dev") sendErrorDev(err, res);
  else {
    sendErrorProd(err, res);
  }
};

export default errorHandling;
