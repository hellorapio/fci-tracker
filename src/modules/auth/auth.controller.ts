import { Request, Response } from "express";
import AuthValidator from "./auth.validator";
import AuthService from "./auth.service";
import sendResponse from "../../utils/sendResponse";
import UserService from "../users/user.service";

const login = async (req: Request, res: Response) => {
  const body = await AuthValidator.login(req.body);
  const token = await AuthService.login(body);
  sendResponse(200, res, undefined, token);
};

const signup = async (req: Request, res: Response) => {
  const body = await AuthValidator.signup(req.body);
  const token = await AuthService.signup(body);
  sendResponse(200, res, undefined, token);
};

const logout = async (req: Request, res: Response) => {
  await AuthService.logout(req.user.id);
  sendResponse(200, res, undefined, "");
};

export default { login, signup, logout };
