import { Request, Response } from "express";
import User from "../models/User";

/** @PUT /users/<user._id> */
export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );
    const { isAdmin, password, ...other } = updatedUser!._doc;
    return res.status(200).json({ ...other });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err });
  }
};

/** @DELETE /users/<user._id> */
export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const deleted = await User.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: "User does not exist" });
    }
    return res.status(200).json({ message: "User has been deleted" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err });
  }
};

/** @GET /users */
export const getAllUsers = async (_: Request, res: Response) => {
  try {
    const allUsers = await User.find();
    return res.status(200).json(allUsers);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err });
  }
};

/** @GET /users/<user._id> */
export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const getUser: any = await User.findById(id);
    const { isAdmin, ...others } = getUser._doc;
    return res.status(200).json({ ...others });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: err });
  }
};
