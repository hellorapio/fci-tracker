import jwt from "jsonwebtoken";
import config from "../config/config";

const signToken = async (id: string) => {
  return jwt.sign(id, config.jwtSecret, {
    expiresIn: config.jwtExpLimit,
  });
};

export default signToken;
