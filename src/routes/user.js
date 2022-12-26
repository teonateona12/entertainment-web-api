import express from "express";
import multer from "multer";
import { loginUser, signupUser } from "../controllers/userController.js";
import { filmFunction, getFilm } from "../controllers/filmController.js";

const router = express.Router();

router.post("/user/login", loginUser);

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/storage");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const fileStorageAvatar = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/avatar");
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
  "/user/signup",
  multer({ storage: fileStorageAvatar, fileFilter: fileFilter }).single(
    "avatar"
  ),
  signupUser
);
router.post(
  "/films",
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("avatar"),
  filmFunction
);

router.get("/film", getFilm);

export default router;
