import AppError from "../../error/appError";
import signToken from "../../utils/signToken";
import User, { IUser } from "./../users/user.model";

class AuthService {
  static async login({ email, password }: IUser) {
    const user = await User.findOne({ email }).select("password");

    if (!user || !(await user.correctPassword(password, user.password)))
      throw new AppError("Incorrect email or password", 401);

    return signToken(user.id);
  }

  static async signup({ email, password, role, name, nationalId }: IUser) {
    const user = await User.create({
      email,
      password,
      role,
      name,
      nationalId,
    });

    return signToken(user.id);
  }
}

export default AuthService;
