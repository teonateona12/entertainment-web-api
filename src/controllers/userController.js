import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    if ((!email, !password)) {
      return res.status(400).json({ error: "Please enter all required fiels" });
    }
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(400).json({ error: "Wrong email or wassword" });
    }
    const passwordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!passwordCorrect) {
      return res.status(400).json({ error: "Wrong email or wassword" });
    }

    const token = jwt.sign(
      {
        user: existingUser._id,
      },
      process.env.JWT_SECRET
    );
    return res
      .status(200)
      .json({ email: existingUser.email, avatar: existingUser.avatar, token });
  } catch (err) {
    res.status(500).send();
  }
};

export const signupUser = async (req, res) => {
  const { email, password } = req.body;
  const { file } = req;
  console.log(file);
  console.log(email, password);
  try {
    if ((!email, !password)) {
      return res.status(400).json({ error: "Please enter all required fiels" });
    }

    const exist = await User.findOne({ email });
    if (exist) {
      return res
        .status(400)
        .json({ error: "An account with with email already exists" });
    }
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);

    const newUser = new User({
      email,
      password: hash,
      avatar: file.originalname,
    });

    const saveUser = await newUser.save();
    const token = jwt.sign(
      {
        user: saveUser._id,
      },
      process.env.JWT_SECRET
    );
    res
      .cookie("token", token, {
        httpOnly: true,
      })
      .send();
  } catch (err) {
    res.status(500).send();
  }
};

export const getUser = async (req, res) => {
  const allUser = await User.find();
  res.status(200).json(allUser);
};
