import { Request, Response } from "express";
import UserService from "./user.service";
import sendResponse from "../../utils/sendResponse";
import UserValidator from "./user.validator";

const getMe = async (req: Request, res: Response) => {
  sendResponse(200, res, req.user);
};

const updateMe = async (req: Request, res: Response) => {
  const body = await UserValidator.updateMe(req.body);
  const user = await UserService.updateMe(req.user.id, body);
  sendResponse(200, res, user);
};

const deleteMe = async (req: Request, res: Response) => {
  await UserService.deleteMe(req.user.id);
  sendResponse(204, res);
};

const getUser = async (req: Request, res: Response) => {
  const { username } = await UserValidator.getUser(req.params);
  const user = await UserService.getUser(username);
  sendResponse(200, res, user);
};

export default { deleteMe, updateMe, getMe, getUser };
