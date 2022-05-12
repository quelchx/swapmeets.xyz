/** middleware will check for admin user */
import { NextFunction, Request, Response } from "express";
import { UserModel } from "../@types";

export default async (_: Request, res: Response, next: NextFunction) => {
  try {
    const user: UserModel = res.locals.user;

    if (user.isAdmin === false) {
      return res.json({ message: "You dont have access to do that" });
    }

    return next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({ error: "Something went wrong" });
  }
};
