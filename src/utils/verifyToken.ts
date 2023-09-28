import jwt from "jsonwebtoken";
import config from "../config/config";

const verify = async (token: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    jwt.verify(
      token,
      config.jwtSecret,
      { algorithms: ["HS256"] },
      (err, data) => {
        if (err) return reject(err);
        resolve(data);
      }
    );
  });
};

export default verify;
