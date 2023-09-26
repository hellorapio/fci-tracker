import jwt from "jsonwebtoken";
import config from "../config/config";

const signToken = (id: string) => {
  return jwt.sign({ id }, config.jwtSecret, {
    expiresIn: config.jwtExpIn,
  });
};

export default signToken;
