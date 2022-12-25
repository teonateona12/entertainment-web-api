import express from "express";
import multer from "multer";
import { loginUser, signupUser } from "../controllers/userController.js";
import { filmFunction } from "../controllers/filmController.js";

const router = express.Router();

router.post("/user/login", loginUser);

router.post("/user/signup", signupUser);

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/storage");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

router.post(
  "/films",
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("avatar"),
  filmFunction
);

export default router;
