import mongoose from "mongoose";

const Schema = mongoose.Schema;

const FilmSchema = new Schema({
  avatar: { type: String },
});

const Film = mongoose.model("Film", FilmSchema);

export default Film;
