import { Request, Response, NextFunction } from "express";
import AppError from "../error/appError";
import User from "../modules/users/user.model";
import verify from "../utils/verifyToken";

const authorization = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // 1 Get the token

  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  )
    token = req.headers.authorization.split(" ")[1];
  else if (req.cookies.jwt) token = req.cookies.jwt;

  if (!token)
    throw new AppError("You haven't logged in Please Login Back", 401);

  // 2 Verify the token

  const { iat, id } = await verify(token);

  // 3 Check if the user still in our System

  const user = await User.findById(id).select(
    "+passwordChangedAt +loggedOutAt"
  );

  if (!user) throw new AppError("You don't exist on our application", 401);

  // 4 check if user has changed his password or not & logged out or not

  if ((await user.loggedOut(iat)) || (await user.changedPassword(iat)))
    throw new AppError(
      "You have logged out or changed your password, Please Login back",
      401
    );

  req.user = user;
  next();
};

export default authorization;
