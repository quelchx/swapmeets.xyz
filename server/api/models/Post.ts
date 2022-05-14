import { Schema, model } from "mongoose";
import { PostModel } from "../@types";

const PostSchema = new Schema<PostModel>(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    likes: {
      type: Number,
      default: 0,
    },
    comments: [{ body: String, author: String }],
  },
  { timestamps: true }
);

export default model<PostModel>("Post", PostSchema);
