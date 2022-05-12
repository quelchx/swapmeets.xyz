import { Router } from "express";
import {
  register,
  login,
  logout,
  getCurrentUser,
} from "../controller/auth.controller";
import auth from "../middleware/auth";
import user from "../middleware/user";

const router = Router();

router.post("/register", register);
router.post("/login", login);

router.get("/logout", user, auth, logout);
router.get("/current-user", user, auth, getCurrentUser);

export default router;
