import AppError from "../../error/appError";
import User, { IUser } from "./../users/user.model";

class AuthService {
  static async login({ email, password }: IUser) {
    const user = await User.findOne({ email }).select("password");

    if (!user || !(await user.correctPassword(password, user.password)))
      throw new AppError("Incorrect email or password", 401);

    return user;
  }

  static async signup({ email, password, role, name }: IUser) {
    const user = await User.create({
      email,
      password,
      role,
      name,
    });

    return user;
  }
}

export default AuthService;
