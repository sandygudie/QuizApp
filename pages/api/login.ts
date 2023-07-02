import type { NextApiRequest, NextApiResponse } from "next";
import User from "../../models/user";
import connectMongo from "../../utils/connectMongo";

/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "POST": {
      return login(req, res);
    }
  }
}
async function login(req: NextApiRequest, res: NextApiResponse) {
  try {
    await connectMongo();
    const { username, userId } = req.body;
    const existingUser = await User.findOne({ username });
    const existingId = await User.findOne({ _id: userId });
    if (existingUser && existingId) {
      const quizuser = {
        _id: existingUser._id,
        username: existingUser.username,
        category: existingUser.category,
        image: existingUser.image,
      };
      return res.status(200).json({ message: "Login successful", quizuser });
    } else if (!existingUser && !existingId) {
      const addedUser = await User.create(req.body);
      return res.status(201).json({ message: "New account added", addedUser });
    } else if (existingUser && !existingId) {
      return res.status(200).json({ message: "Username already exist" });
    }
  } catch (error) {
    res.json(error);
  }
}
