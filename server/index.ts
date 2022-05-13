import "dotenv/config";
import express, { Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";

import authRoutes from "./api/routes/auth.routes";
import userRoutes from "./api/routes/user.routes";
import postRoutes from "./api/routes/post.routes";

const app = express();
const PORT = process.env.PORT || 4000;
const { connect, connection } = mongoose;

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: process.env.ORIGIN,
    optionsSuccessStatus: 200,
  })
);

app.use(express.static("public"));

app.get("/", (_: Request, res: Response) => {
  return res.send(`Server is running`);
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

connection.on("disconnected", () => {
  console.log("Mongo Atlas has been disconnected!");
});

connection.on("connected", () => {
  console.log("Connecting to Mongo Atlas");
});

app.listen(PORT, async () => {
  try {
    await connect(process.env.MONGO_URL!);
    console.log(
      `Database has connected, server is running on localhost:${PORT}`
    );
  } catch (err) {
    console.log(err);
  }
});
