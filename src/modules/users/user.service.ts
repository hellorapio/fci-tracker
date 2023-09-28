import AppError from "../../error/appError";
import User, { IUser } from "./user.model";

class UserService {
  static async updateMe(id: string, body: IUser) {
    const user = await User.findByIdAndUpdate(id, body);
    return user;
  }

  static async deleteMe(id: string) {
    await User.findByIdAndUpdate(id, { active: false });
  }

  static async getUser(username: string) {
    const user = await User.findOne({ username });
    if (!user) throw new AppError("User is not found", 404);
    return user;
  }
}

export default UserService;
