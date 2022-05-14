import { Router } from "express";
import {
  addUserToMeeting,
  commentOnPost,
  createPost,
  deleteComment,
  deletePost,
  getAllPosts,
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
router.post("/", user, auth, createPost);
router.delete("/:id", user, auth, deletePost);
router.put("/:id", user, auth, updatePost);
router.put("/like-post/:id", user, auth, likePost);

router.put("/comment/:id", user, auth, commentOnPost);
router.put("/update-comment/:id", user, auth, updateCommentOnPost);
router.put("/like-comment/:id", user, auth, likePostComment);
router.delete("/comment/:id", user, auth, deleteComment);

router.put("/:id/meeting", addUserToMeeting);
router.put("/:id/meeting/remove", removeUserFromMeeting);

export default router;
