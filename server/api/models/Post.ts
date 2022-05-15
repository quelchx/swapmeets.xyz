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
      id: {
        type: String,
        required: true,
      },
      username: {
        type: String,
        required: true,
      },
    },
    likes: {
      type: Array,
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
          id: {
            type: String,
            required: true,
          },
          username: {
            type: String,
            required: true,
          },
        },
        likes: {
          type: Array,
        },
        created: {
          type: Date,
          default: new Date(Date.now()),
        },
      },
    ],
  },
  { timestamps: true }
);

export default model<PostModel>("Post", PostSchema);
