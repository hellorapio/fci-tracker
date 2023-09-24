import { Request, Response } from "express";
import AuthValidator from "./auth.validator";
import AuthService from "./auth.service";

const login = async (req: Request, res: Response) => {
  const body = await AuthValidator.login(req.body);
  const loggedIn = await AuthService.login(body);
  res.status(200).json({ status: "Success" });
};

const signup = async (req: Request, res: Response) => {
  res.status(200).json({ status: "Success" });
};

export default { login, signup };
