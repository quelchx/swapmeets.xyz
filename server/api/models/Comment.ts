import { Schema, model } from "mongoose";
import { CommentModel } from "../@types";

const CommentSchema = new Schema<CommentModel>(
  {
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
  },
  { timestamps: true }
);

export default model<CommentModel>("Comment", CommentSchema);
