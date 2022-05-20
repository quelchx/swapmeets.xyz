import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookie from "cookie";
import User from "../models/User";
import { Request, Response } from "express";
import Axios from "axios";
const authError = (res: Response) => {
  return res.status(404).json({ error: "Credentails do not match" });
};

/** @POST /auth/register  */
export const register = async (req: Request, res: Response) => {
  const { username, email, password, token } = req.body;

  const secret = process.env.PRIVATE_RECAPTCHA_KEY;

  const salt = bcrypt.genSaltSync();
  const hash = bcrypt.hashSync(password, salt);

  try {
    const { data } = await Axios(
      `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${token}`,
      { method: "POST" }
    );

    const newUser = new User({
      username,
      email,
      password: hash,
      verified: data.success,
    });

    await newUser.save();
    res.status(200).json({ message: "User Created" });
  } catch (err) {
    res.status(500).json(err);
  }
};

/** @POST /auth/login */
export const login = async (req: Request, res: Response) => {
  const { username } = req.body;
  try {
    const user = await User.findOne({ username: username });
    if (!user) return authError(res);

    const isPasswordVerified = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordVerified) return authError(res);

    const token: string = jwt.sign({ username }, process.env.JWT_SECRET!);

    // extracting password and isAdmin to remove from JSON return
    const { password, isAdmin, ...others } = user._doc;

    res.set(
      "Set-Cookie",
      cookie.serialize("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 1800,
        path: "/",
      })
    );

    return res.json({ ...others });
  } catch (err) {
    return res.status(500).json(err);
  }
};

/** @GET /auth/logout */
export const logout = (_: Request, res: Response) => {
  res.set(
    "Set-Cookie",
    cookie.serialize("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      expires: new Date(0),
      path: "/",
    })
  );

  return res.status(200).json({ success: true });
};

/** @GET /auth/current-user */
export const getCurrentUser = (_: Request, res: Response) => {
  const user = res.locals.user;
  const { isAdmin, ...others } = user._doc;
  return res.json({ ...others });
};
