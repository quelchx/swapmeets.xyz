import mongoose from "mongoose";

export interface PostModel {
  title: string;
  body: string;
  author: string;
  comments?: [{ id: string; body: string; author: string }];
}

const PostSchema = new mongoose.Schema<PostModel>(
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
    comments: [{ id: String, body: String, author: String }],
  },
  { timestamps: true }
);

export default mongoose.model<PostModel>("Post", PostSchema);
