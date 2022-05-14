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
    authorId: {
      type: String,
      required: true,
    },
    likes: {
      type: Number,
      default: 0,
    },
    meeting: {
      attending: {
        type: Array,
        required: false,
      },
      date: {
        type: Date,
        required: true,
      },
      time: {
        type: String,
        required: true,
      },
      location: {
        city: {
          type: String,
          required: true,
        },
        country: {
          type: String,
          required: true,
        },
        address: {
          type: String,
          required: true,
        },
        place: {
          type: String,
          required: true,
        },
      },
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
