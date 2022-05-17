import auth from "../middleware/auth";
import user from "../middleware/user";
import express from "express";
import {
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} from "../controller/user.controller";

const router = express.Router();

router.put("/:id", user, auth, updateUser);
router.delete("/:id", user, auth, deleteUser);

router.get("/", getAllUsers);
router.get("/user/:id", getUserById);

export default router;
