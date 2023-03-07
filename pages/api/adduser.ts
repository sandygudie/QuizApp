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
      return addUser(req, res);
    }
  }
}

// Add User  Sign up new user
const addUser = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await connectMongo();
    const { username } = req.body;
    const existingUser = await User.findOne({ username });
    const userCount = await User.count({});

    if (existingUser) {
      return res.status(400).json({
        error: "username already exist",
      });
    } else {
      const addedUser = await User.create(req.body);
      const quizuser = {
        _id: addedUser._id,
        username: addedUser.username,
        createdDate: addedUser.createdDate,
        category: addedUser.category,
        image: addedUser.image,
        userNo: userCount + 1
      };
      res.status(201).json({ message: "successful", quizuser });
    }
  } catch (error) {
    res.json(error);
  }
};

// why you needd password?
// If a user knows that a signup name already exists, user can use that to login and acess peoples account
// password is the extra Auth
