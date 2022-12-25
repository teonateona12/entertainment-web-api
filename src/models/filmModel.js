import mongoose from "mongoose";

const Schema = mongoose.Schema;

const FilmSchema = new Schema({
  title: { type: String },
  avatar: { type: String },
  year: { type: Number },
  category: { type: String },
  rating: { type: String },
  isBookmarked: { type: Boolean },
  isTrending: { type: Boolean },
});

const Film = mongoose.model("Film", FilmSchema);

export default Film;
