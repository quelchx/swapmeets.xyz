import { Request, Response } from "express";
// import { createClient } from "redis";
import Post from "../models/Post";

// const client = createClient();
// client.connect();
// client.on("error", () => console.error);

/** @POST /posts */
export const createPost = async (req: Request, res: Response) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    return res.status(200).json(savedPost);
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};

/** @PUT /posts/<post._id> */
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

/** @DELETE /posts/<post._id> */
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

/** @GET /posts (optional) /posts?limit=<number>&title=<post.title> */
export const getAllPosts = async (req: Request, res: Response) => {
  const { limit, ...other }: any = req.query;
  // const cache = await client.get("posts");

  try {
    // if (cache != null) {
    //   return res.status(200).json(JSON.parse(cache));
    // } else {
      const posts = await Post.find({
        ...other,
      }).limit(parseInt(limit));
      // one minute cache time limit -- posts update, but to limit calls to mongo atlas, cache is in place to hold data
      // client.setEx("posts", 60, JSON.stringify(posts));
      return res.status(200).json(posts);
    // }
  } catch (err) {
    return res.status(404).json({ error: err });
  }
};

/** @GET /posts/<post._id> */
export const getPostById = async (req: Request, res: Response) => {
  const { id } = req.params;
  // const cache = await client.get(id);
  try {
    // if (cache != null) {
    //   return res.status(200).json(JSON.parse(cache));
    // } else {
    const post = await Post.findById(id);
    // client.setEx(id, 60, JSON.stringify(post));
    return res.status(200).json(post);
    // }
  } catch (err) {
    return res.status(404).json({ error: err });
  }
};

export const getPostBySlug = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const post = await Post.findOne({ "post.slug": id });
    return res.status(200).json(post);
  } catch (err) {
    return res.status(404).json({ error: err });
  }
};

/** @PUT /posts/comment/<post._id> */
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

/** @PUT /posts/update-comment/<post._id> */
export const updateCommentOnPost = async (req: Request, res: Response) => {
  const { id, body, author } = req.body;
  try {
    const post = await Post.updateOne(
      {
        _id: req.params.id,
        "comments.$._id": id,
        "comments.author.id": author,
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

/** @DELETE /posts/comments/<post._id>?comment=<comment_id> */
export const deleteComment = async (req: Request, res: Response) => {
  const { comment } = req.query;

  try {
    const post = await Post.updateOne(
      {
        _id: req.params.id,
      },
      {
        $pull: { comments: { _id: comment } },
      },
      { upsert: false, multi: true }
    );

    return res.status(200).json(post);
  } catch (err) {
    return res
      .status(404)
      .json({ error: "Something went wrong deleting this comment" });
  }
};

/** @PUT /posts/like/<post._id> */
export const likePost = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { user } = req.body;
  try {
    const post = await Post.findByIdAndUpdate(
      id,
      { $addToSet: { likes: user } },
      { new: true }
    );
    return res.status(200).json(post);
  } catch (err) {
    return res.status(404).json({ error: err });
  }
};

/** @PUT /posts/<post._id>/meeting/remove */
export const removeUserFromMeeting = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { user } = req.body;

  try {
    const post = await Post.updateOne(
      { _id: id },
      {
        $pull: { "meeting.attending": user },
      },
      { new: true }
    );
    return res.status(200).json(post);
  } catch (err) {
    return res.status(404).json({ error: err.message });
  }
};

/** @PUT /posts/<post._id>/meeting */
export const addUserToMeeting = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { user } = req.body;
  try {
    const post = await Post.findByIdAndUpdate(
      id,
      {
        $addToSet: { "meeting.attending": user },
      },
      { new: true }
    );
    return res.status(200).json(post);
  } catch (err) {
    return res.status(404).json({ error: err.message });
  }
};

/** @PUT /posts/<post._id>/like-comment */
export const likePostComment = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { comment } = req.body;
  try {
    const post = await Post.updateOne(
      {
        _id: id,
        "comments._id": comment,
      },
      { $addToSet: { "comments.$.likes": req.body.user } },
      { new: true }
    );

    return res.status(200).json(post);
  } catch (err) {
    return res
      .status(404)
      .json({ error: "Something went wrong liking this post" });
  }
};
