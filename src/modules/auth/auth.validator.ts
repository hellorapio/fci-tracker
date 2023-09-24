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
  .regex(/^[A-Z][a-zA-Z]* [A-Z][a-zA-Z]*$/)
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
  .messages({
    "any.only": "This role is not allowed in our application",
  });

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
});

class AuthValidator {
  static async login(body: IUser) {
    const data = catchValid(login, body);
    return data;
  }
}

export default AuthValidator;
