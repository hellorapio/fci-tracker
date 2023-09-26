import Joi from "joi";
import catchValid from "../../utils/catchValid";
import { IUser } from "../users/user.model";

const email = Joi.string()
  .email()
  .message("Email is not Valid")
  .lowercase()
  .trim()
  .required()
  .messages({
    "any.required": "Email is Required",
  });

const name = Joi.string()
  .regex(/^[a-zA-Z\s]+$/)
  .message("Name cannot contain characters other than letters")
  .trim();

const password = Joi.string()
  .required()
  .messages({ "any.required": "password is Required" });

const passwordConfirm = Joi.string()
  .valid(Joi.ref("password"))
  .required()
  .messages({
    "any.only": "passwords doesn't match up",
  });

const role = Joi.string()
  .valid("instructor", "student", "professor")
  .required()
  .messages({
    "any.only": "This role is not allowed in our application",
    "any.required": "The role is Required",
  });

const nationalId = Joi.string()
  .length(14)
  .message("This national id isn't corrrect")
  .regex(/^[0-9]+$/)
  .message("The national id only contains numbers")
  .required()
  .messages({ "any.required": "The national id is required" });

const login = Joi.object({
  email,
  password,
});

const signup = Joi.object({
  name: name.required(),
  password: password
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d!@#$%^&*()-_=+[\]{};:'",.<>?]*$/
    )
    .message("Password isn't strong enough"),
  email,
  passwordConfirm,
  role,
  nationalId,
});

class AuthValidator {
  static async login(body: IUser) {
    const data = catchValid(login, body);
    return data;
  }

  static async signup(body: IUser) {
    const data = catchValid(signup, body);
    return data;
  }
}

export default AuthValidator;
