import Film from "../models/filmModel.js";

export const filmFunction = async (req, res) => {
  const { file, body } = req;
  console.log(req);

  // if (error) {
  //   return res.status(401).json("err");
  // }

  await Film.create({
    avatar: file,
  });

  return res.status(200).json("Film added");
};
