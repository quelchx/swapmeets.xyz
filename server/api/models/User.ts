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
    // isAdmin: {
    //   type: Boolean,
    //   default: false,
    // },
    bio: {
      type: String,
    },
    // avatar: {
    //   data: Buffer,
    //   contentType: String,
    // },
    city: {
      type: String,
    },
    country: {
      type: String,
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
