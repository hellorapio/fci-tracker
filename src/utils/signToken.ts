import jwt from "jsonwebtoken";
import config from "../config/config";

const signToken = (id: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      { id },
      config.jwtSecret,
      {
        expiresIn: config.jwtExpIn,
      },
      (err, token) => {
        if (err) return reject(err);
        resolve(token);
      }
    );
  });
};

export default signToken;
