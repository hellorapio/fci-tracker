import Joi from "joi";
import catchValid from "../../utils/catchValid";
import { IUser } from "./user.model";

const gender = Joi.string()
  .valid("male", "female")
  .messages({ "any.only": "only male or female" });

const name = Joi.string()
  .regex(/^[a-zA-Z\s]+$/)
  .message("Name cannot contain characters other than letters")
  .trim();

const email = Joi.string()
  .email()
  .message("Email is not Valid")
  .lowercase()
  .trim();

const username = Joi.string()
  .trim()
  .regex(/^[a-zA-Z0-9-]*$/)
  .message("Username is not acceptable");

const updateMe = Joi.object({
  gender,
  name,
  email,
  username,
});

const getUser = Joi.object({
  username: username
    .required()
    .messages({ "any.required": "Username is required" }),
});

class UserValidator {
  static async updateMe(body: IUser) {
    const data = catchValid(updateMe, body);
    return data;
  }

  static async getUser(body: object) {
    const data = catchValid(getUser, body);
    return data;
  }
}

export default UserValidator;
