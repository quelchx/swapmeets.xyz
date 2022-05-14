import { Schema, model } from "mongoose";

export interface PostModel {
  title: string;
  body: string;
  author: string;
  authorId: string;
  likes?: number;
  comments?: [
    {
      body: string;
      author: string;
      authorId: string;
      likes?: number;
    }
  ];
}

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
    authorId: {
      type: String,
      required: true,
    },
    likes: {
      type: Number,
      default: 0,
    },
    comments: [
      {
        body: {
          type: String,
          required: true,
        },
        author: {
          type: String,
          required: true,
        },
        authorId: {
          type: String,
          required: true,
        },
        likes: {
          type: Number,
          default: 0,
        },
      },
    ],
  },
  { timestamps: true }
);

export default model<PostModel>("Post", PostSchema);
