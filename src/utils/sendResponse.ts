import { Response } from "express";

const sendResponse = (code: number, res: Response, data?: any) => {
  res.status(code).json({ status: "success", data });
};

export default sendResponse;
