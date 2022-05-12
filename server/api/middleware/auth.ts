/** middleware will check for authenticated user */
import { NextFunction, Request, Response } from "express";
import { UserModel } from "../@types";

export default async (_: Request, res: Response, next: NextFunction) => {
  try {
    const user: UserModel | undefined = res.locals.user;

    if (!user) throw new Error("Unauthenticated");

    return next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({ error: "Unauthenticated" });
  }
};
