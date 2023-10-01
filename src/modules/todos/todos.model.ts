import { randomBytes } from "crypto";
import { model, Schema, Document, SchemaTypes, ObjectId } from "mongoose";
import slugify from "slugify";

export interface ITodo extends Document {
  author: ObjectId;
  expires: Date;
  title: string;
  slug: string;
  description: string;
  submission: string;
}

const todoSchema = new Schema<ITodo>(
  {
    author: SchemaTypes.ObjectId,
    expires: Date,
    title: String,
    slug: { type: String, unique: true },
    description: String,
    submission: String,
  },
  { timestamps: true, versionKey: false }
);

todoSchema.pre("save", async function (next) {
  if (!this.isNew) return next();
  this.slug = slugify(this.title + randomBytes(3).toString("hex"), {
    lower: true,
  });
  next();
});

const Todo = model<ITodo>("todo", todoSchema);

export default Todo;
