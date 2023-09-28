import { Response } from "express";
import config from "../config/config";

const sendResponse = (
  code: number,
  res: Response,
  data?: any,
  token?: string
) => {
  if (token) {
    const cookieOptions = {
      secure: config.env === "prod",
      httpOnly: true,
      expires: new Date(
        Date.now() + 24 * 60 * 60 * 1000 * Number(config.jwtCookie)
      ),
    };
    res.cookie("jwt", token, cookieOptions);
  } else if (token === "") {
    res.cookie("jwt", "");
  }

  res.status(code).json({ status: "success", data });
};

export default sendResponse;
