import { Router } from "express";
import {
  createPost,
  deletePost,
  getAllPosts,
  updatePost,
} from "../controller/post.controller";
import auth from "../middleware/auth";
import user from "../middleware/user";

const router = Router();

router.post("/", user, auth, createPost);
router.put("/:id", user, auth, updatePost);
router.delete("/:id", user, auth, deletePost);

router.get("/", getAllPosts);

export default router;
