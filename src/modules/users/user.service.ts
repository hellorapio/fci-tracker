import AppError from "../../error/appError";
import { IUser } from "./user.model";
import UserRepository from "./user.repository";

class UserService {
  static async updateMe(id: string, body: IUser) {
    const user = await UserRepository.updateOneById(id, body);
    return user;
  }

  static async deleteMe(id: string) {
    await UserRepository.updateOneById(id, { active: false });
  }

  static async getUser(username: string) {
    const user = await UserRepository.findOne({ username, active: true });
    if (!user) throw new AppError("User is not found", 404);
    return user;
  }
}

export default UserService;
