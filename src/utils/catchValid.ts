import { Schema } from "joi";
import AppError from "../error/appError";

const catchValid = async (joiSchema: Schema, body: object) => {
  const data = await joiSchema.validateAsync(body).catch((err: Error) => {
    throw new AppError(err.message, 400);
  });

  return data;
};

export default catchValid;
