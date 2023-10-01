import AppError from "../../error/appError";
import signToken from "../../utils/signToken";
import userRepository from "../users/user.repository";
import { IUser } from "./../users/user.model";

class AuthService {
  static async login({ email, password }: IUser) {
    const user = await userRepository.findOne({ email }, "+password");
    if (!user || !(await user.correctPassword(password, user.password)))
      throw new AppError("Incorrect email or password", 401);

    return await signToken(user.id);
  }

  static async signup({ email, password, role, name, nationalId }: IUser) {
    const user = await userRepository.insertOne({
      email,
      password,
      role,
      name,
      nationalId,
    });

    return await signToken(user.id);
  }

  static async logout(id: string) {
    await userRepository.updateOneById(id, {
      loggedOutAt: Date.now(),
    });
  }
}

export default AuthService;
