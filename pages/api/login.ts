import type { NextApiRequest, NextApiResponse } from "next";
import User from "../../models/user";
import connectMongo from "../../utils/connectMongo";

/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */
export default async function login(req: NextApiRequest, res: NextApiResponse) {
  try {
    await connectMongo();
    const { username } = req.body;
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      const quizuser = {
        _id: existingUser._id,
        username: existingUser.username,
        createdDate: existingUser.createdDate,
        category: existingUser.category,
        image: existingUser.image,
      };
      return res.status(200).json({ message: "login successful" ,quizuser });
    } else {
      return res.status(401).json({
        error: "username does not exist",
      });
    }
  } catch (error) {
    res.json(error);
  }
}
