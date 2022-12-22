import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import router from "./routes/user.js";
import bodyParser from "body-parser";

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
const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use("/api/user", router);

app.listen(5000);
