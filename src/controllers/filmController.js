import Film from "../models/filmModel.js";

export const filmFunction = async (req, res) => {
  const { file, body } = req;
  console.log(body);

  await Film.create({
    avatar: file.originalname,
    title: body.title,
    year: body.year,
    category: body.category,
    rating: body.rating,
    isBookmarked: body.isBookmarked,
    isTrending: body.isTrending,
  });

  return res.status(200).json("Film added");
};

export const getFilm = async (req, res) => {
  const allFilm = await Film.find();
  res.status(200).json(allFilm);
};
