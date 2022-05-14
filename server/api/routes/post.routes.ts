import { Router } from "express";
import {
  commentOnPost,
  createPost,
  deleteComment,
  deletePost,
  getAllPosts,
  likePost,
  likePostComment,
  updateCommentOnPost,
  updatePost,
} from "../controller/post.controller";
import auth from "../middleware/auth";
import user from "../middleware/user";

const router = Router();

router.post("/", user, auth, createPost);
router.put("/:id", user, auth, updatePost);
router.put("/update-comment/:id", user, auth, updateCommentOnPost);

router.delete("/:id", user, auth, deletePost);
router.delete("/comment/:id", deleteComment);
router.get("/", getAllPosts);

router.put("/comment/:id", user, auth, commentOnPost);
router.put("/like-post/:id", user, auth, likePost);
router.put("/like-comment/:id", user, auth, likePostComment);
export default router;
