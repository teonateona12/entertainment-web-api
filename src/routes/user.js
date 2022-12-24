import express from "express";
import multer from "multer";
import { loginUser, signupUser } from "../controllers/userController.js";
import { filmFunction } from "../controllers/filmController.js";

const router = express.Router();

router.post("/login", loginUser);

router.post("/signup", signupUser);

router.post(
  "/films",
  multer({ dest: "public/storage" }).single("avatar"),
  filmFunction
);

export default router;
