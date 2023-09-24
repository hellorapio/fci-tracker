import { Document, model, Schema } from "mongoose";
import bcrypt from "bcryptjs";
interface IUserMethods extends Document {
  correctPassword(pass: string, realPass: string): Promise<boolean>;
}

interface IUserSchema extends Document {
  name: string;
  email: string;
  password: string;
  username: string;
  role: "instructor" | "student" | "professor" | "moderator";
  passwordChangedAt: Date;
  active: boolean;
  loggedOutAt: Date;
  nationalId: string;
}

export type IUser = IUserSchema & IUserMethods;

const userSchema = new Schema<IUser>(
  {
    name: String,
    email: { type: String, unique: true },
    username: { type: String, unique: true },
    nationalId: String,
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

userSchema.methods.correctPassword = async (
  pass: string,
  realPass: string
) => {
  return await bcrypt.compare(pass, realPass);
};

const User = model<IUser>("user", userSchema);

export default User;
