import { Router } from "express";
import {
  commentOnPost,
  createPost,
  deletePost,
  getAllPosts,
  increaseLikes,
  updateCommentOnPost,
  updatePost,
} from "../controller/post.controller";
import auth from "../middleware/auth";
import user from "../middleware/user";

const router = Router();

router.post("/", user, auth, createPost);
router.put("/:id", user, auth, updatePost);
router.put("/like/:id", user, auth, increaseLikes);

router.delete("/:id", user, auth, deletePost);
router.get("/", getAllPosts);

router.put("/comment/:id", user, auth, commentOnPost);
router.put("/update-comment/:id", updateCommentOnPost);

export default router;
