import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import router from "./routes/user.js";
import bodyParser from "body-parser";
import swaggerMiddleware from "./middlewares/swagger-middleware.js";

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
app.use("/images", express.static("public/storage"));
app.use("/api", router);
app.use("/", ...swaggerMiddleware);

app.listen(5000);
