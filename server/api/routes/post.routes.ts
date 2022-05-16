import { Router } from "express";
import {
  addUserToMeeting,
  commentOnPost,
  createPost,
  deleteComment,
  deletePost,
  getAllPosts,
  getPostById,
  getPostBySlug,
  likePost,
  likePostComment,
  removeUserFromMeeting,
  updateCommentOnPost,
  updatePost,
} from "../controller/post.controller";
import auth from "../middleware/auth";
import user from "../middleware/user";

const router = Router();

router.get("/", getAllPosts);
router.get("/:id", getPostById);
router.get("/post/:id", getPostBySlug);

router.post("/", user, auth, createPost);
router.delete("/:id", user, auth, deletePost);
router.put("/:id", user, auth, updatePost);

router.put("/:id/like", user, auth, likePost);

router.put("/:id/comment", user, auth, commentOnPost);
router.put("/:id/update-comment", user, auth, updateCommentOnPost);
router.put("/:id/like-comment", user, auth, likePostComment);
router.delete("/:id/delete-comment", user, auth, deleteComment);

router.put("/:id/attend-meeting", addUserToMeeting);
router.put("/:id/remove-from-meeting", removeUserFromMeeting);

export default router;
