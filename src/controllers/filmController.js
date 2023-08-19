import Film from "../models/filmModel.js";

export const filmFunction = async (req, res) => {
  const { file, body } = req;
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

export const tooggleBooked = async (req, res) => {
  const { isBookmarked } = req.body;
  try {
    const { id } = req.params;
    const booked = await Film.findOne({ id });
    if (!booked) {
      res.status(404).json({ message: "Film not found" });
      return;
    }
    booked.isBookmarked = isBookmarked;
    await booked.save();
    res.status(200).json({ message: "Bookmarked changed" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "It's an error", error });
  }
};
