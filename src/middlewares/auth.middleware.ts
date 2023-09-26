import { Request, Response, NextFunction } from "express";

const authorization = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  next();
};

export default authorization;
