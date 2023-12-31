import { model, Schema, Document, ObjectId, SchemaTypes } from "mongoose";
import { randomBytes } from "crypto";
import bcrypt from "bcryptjs";
import slugify from "slugify";
import { number } from "joi";

interface IUserMethods extends Document {
  correctPassword(pass: string, realPass: string): Promise<boolean>;
  changedPassword(iat: number): Promise<boolean>;
  loggedOut(iat: number): Promise<boolean>;
}

interface IUserSchema extends Document {
  photo: string;
  gender: "male" | "female";
  name: string;
  email: string;
  password: string;
  username: string;
  role: "instructor" | "student" | "professor" | "moderator" | "admin";
  passwordChangedAt: Date;
  active: boolean;
  loggedOutAt: Date;
  nationalId: string;
  year: number;
  semester: number;
}

export type IUser = IUserSchema & IUserMethods;

const userSchema = new Schema<IUser>(
  {
    photo: String,
    gender: String,
    name: String,
    year: Number,
    semester: Number,
    email: { type: String, unique: true },
    username: { type: String, unique: true },
    nationalId: { type: String, select: false },
    password: { type: String, select: false },
    role: String,
    active: { type: Boolean, default: true, select: false },
    passwordChangedAt: { type: Date, select: false },
    loggedOutAt: { type: Date, select: false },
  },
  { timestamps: true, versionKey: false }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 8);
  next();
});

userSchema.pre("save", async function (next) {
  if (!this.isNew) return next();
  this.username = slugify(this.name + randomBytes(3).toString("hex"), {
    lower: true,
  });
  next();
});

userSchema.methods.correctPassword = async (
  pass: string,
  realPass: string
) => {
  return await bcrypt.compare(pass, realPass);
};

userSchema.methods.changedPassword = async function (iat: number) {
  if (this.passwordChangedAt)
    return iat < Math.trunc(this.passwordChangedAt.getTime() / 1000);
};

userSchema.methods.loggedOut = async function (iat: number) {
  if (this.loggedOutAt)
    return iat < Math.trunc(this.loggedOutAt.getTime() / 1000);
};

const User = model<IUser>("user", userSchema);

export default User;
