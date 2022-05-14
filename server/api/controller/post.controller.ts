import { Request, Response } from "express";
import { createClient } from "redis";
import Post from "../models/Post";

const client = createClient();
client.connect();
client.on("error", () => console.error);

export const createPost = async (req: Request, res: Response) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    return res.status(200).json(savedPost);
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};

export const increaseLikes = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const post = await Post.findByIdAndUpdate(
      id,
      { $inc: { likes: 1 } },
      { new: true }
    );
    return res.status(200).json(post);
  } catch (err) {
    return res.status(404).json({ error: err });
  }
};

export const updatePost = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const updatePost = await Post.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );
    return res.status(200).json(updatePost);
  } catch (err) {
    console.log(err);
    return res.status(404).json({ error: err });
  }
};

export const deletePost = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const deletedPost = await Post.findByIdAndDelete(id);
    if (!deletedPost) {
      return res.status(404).json({ error: "Post does not exist" });
    } else {
      return res.status(200).json({ message: "Post has been deleted" });
    }
  } catch (err) {
    console.error(err);
    return res.json(404).json({ error: err });
  }
};

export const getAllPosts = async (req: Request, res: Response) => {
  const { limit, ...other }: any = req.query;
  const cache = await client.get("posts");

  try {
    if (cache != null) {
      return res.status(200).json(JSON.parse(cache));
    } else {
      const posts = await Post.find({
        ...other,
      }).limit(parseInt(limit));
      // one minute cache time limit -- posts update, but to limit calls to mongo atlas, cache is in place to hold data
      client.setEx("posts", 60, JSON.stringify(posts));
      return res.status(200).json(posts);
    }
  } catch (err) {
    return res.status(404).json({ error: err });
  }
};

export const getPostById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const cache = await client.get(id);
  try {
    if (cache != null) {
      return res.status(200).json(JSON.parse(cache));
    } else {
      const post = await Post.findById(id);
      client.setEx(id, 60, JSON.stringify(post));
      return res.status(200).json(post);
    }
  } catch (err) {
    return res.status(404).json({ error: err });
  }
};

export const commentOnPost = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const post = await Post.findByIdAndUpdate(
      id,
      {
        $push: { comments: req.body },
      },
      { new: true }
    );
    return res.status(200).json(post);
  } catch (err) {
    return res
      .status(404)
      .json({ error: "Something went wrong generating a new comment" });
  }
};

export const updateCommentOnPost = async (req: Request, res: Response) => {
  const { id, body, author } = req.body;
  try {
    const post = await Post.updateOne(
      {
        _id: req.params.id,
        "comments._id": id,
        "comments.authorId": author,
      },
      {
        $set: { "comments.$.body": body },
      },
      { new: true }
    );
    return res.status(200).json(post);
  } catch (err) {
    return res
      .status(404)
      .json({ error: "Something went wrong trying to update the comment" });
  }
};
