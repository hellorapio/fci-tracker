import BaseRepository from "../../repository/base.repository";
import User, { IUser } from "./user.model";

class UserRepository extends BaseRepository<IUser> {
  constructor() {
    super(User);
  }
}

export default new UserRepository();
