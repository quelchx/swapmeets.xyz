"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var post_controller_1 = require("../controller/post.controller");
var auth_1 = __importDefault(require("../middleware/auth"));
var user_1 = __importDefault(require("../middleware/user"));
var router = (0, express_1.Router)();
router.get("/", post_controller_1.getAllPosts);
router.get("/:id", post_controller_1.getPostById);
router.get("/post/:id", post_controller_1.getPostBySlug);
router.post("/", user_1.default, auth_1.default, post_controller_1.createPost);
router.delete("/:id", user_1.default, auth_1.default, post_controller_1.deletePost);
router.put("/:id", user_1.default, auth_1.default, post_controller_1.updatePost);
router.put("/:id/like", user_1.default, auth_1.default, post_controller_1.likePost);
router.put("/:id/comment", user_1.default, auth_1.default, post_controller_1.commentOnPost);
router.put("/:id/like-comment", user_1.default, auth_1.default, post_controller_1.likePostComment);
router.put("/comment/update/:id", user_1.default, auth_1.default, post_controller_1.updateCommentOnPost);
router.delete("/comment/delete/:id", user_1.default, auth_1.default, post_controller_1.deleteComment);
router.put("/:id/attend-meeting", post_controller_1.addUserToMeeting);
router.put("/:id/remove-from-meeting", post_controller_1.removeUserFromMeeting);
exports.default = router;
//# sourceMappingURL=post.routes.js.map