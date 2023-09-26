import { Response, Request, NextFunction } from "express";
import AppError from "../error/appError";

const restrict = async (roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    if (req.user.role === "admin") next();
    if (!roles.includes(req.user.role))
      throw new AppError("The Request is not Authorized", 401);
    next();
  };
};

export default restrict;
