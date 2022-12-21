import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import router from "./routes/user.js";
import bodyParser from "body-parser";

const app = express();
app.use(cors());
app.use("/api/user", router);

app.use(bodyParser.json());

dotenv.config();
const connection = () => {
  try {
    const connectionUrl = process.env.MONGO_CONNECTION;
    return mongoose.connect(connectionUrl);
  } catch (error) {
    console.log(error);
    return error;
  }
};
connection();

app.listen(5000);
