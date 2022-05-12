import { NextFunction, Request, Response } from "express";
import User from "../models/User";
import { createError } from "../utils/error";

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

export const getAllUsers = async (
  _: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const allUsers = await User.find();
    res.status(200).json(allUsers);
  } catch (err) {
    next(err);
  }
};

export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const getUser = await User.findById(id);
    res.status(200).json(getUser);
  } catch (err) {
    next(err);
  }
};
