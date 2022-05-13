import { NextFunction, Request, Response } from "express";
import User from "../models/User";
import { createError } from "../utils/error";
import { createClient } from "redis";

const client = createClient();
client.connect();
client.on("error", () => console.error);

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );
    const { isAdmin, ...other } = updatedUser!._doc;
    res.status(200).json({ ...other });
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const deleted = await User.findByIdAndDelete(id);
    if (!deleted) {
      return createError(res, "User does not exist");
    }
    res.status(200).json({ message: "User has been deleted" });
  } catch (err) {
    return next(err);
  }
};

// using cache adds 760% increase to time efficency (43ms to hit mongo cluster in comparison to 5ms hitting cache)
export const getAllUsers = async (
  _: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const cache = await client.get("users");
    if (cache != null) {
      console.log("Using cache to send data");
      return res.status(200).json(JSON.parse(cache));
    }

    const allUsers = await User.find();
    client.setEx("users", 1800, JSON.stringify(allUsers));
    console.log("Could not find recent data inside the cache");
    return res.status(200).json(allUsers);
  } catch (err) {
    return next(err);
  }
};

export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const cache = await client.get(id);

    if (cache != null) {
      console.log("Using cache to send user data");
      return res.status(200).json(JSON.parse(cache));
    }

    const getUser = await User.findById(id);
    client.setEx(id, 1800, JSON.stringify(getUser));
    console.log("Could not find recent user data inside the cache");
    return res.status(200).json(getUser);
  } catch (err) {
    return next(err);
  }
};
