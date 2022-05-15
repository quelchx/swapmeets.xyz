import { model, Schema } from "mongoose";
import { UserModel } from "../@types";

const UserSchema = new Schema<UserModel>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    avatar: {
      type: String,
      default:
        "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y",
    },
    socials: {
      facebook: {
        type: String,
      },
      instagram: {
        type: String,
      },
      twitter: {
        type: String,
      },
      snapchat: {
        type: String,
      },
      tiktok: {
        type: String,
      },
    },
  },
  { timestamps: true }
);

export default model<UserModel>("User", UserSchema);
