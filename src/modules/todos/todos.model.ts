import { model, Schema, Document } from "mongoose";

export interface ITodo extends Document {}

const todoSchema = new Schema<ITodo>(
  {},
  { timestamps: true, versionKey: false }
);

const Todo = model<ITodo>("todo", todoSchema);

export default Todo;
