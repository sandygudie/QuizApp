import type { NextApiRequest, NextApiResponse } from "next";
import User from "../../../models/user";
import { ICategory } from "../../../types";
import connectMongo from "../../../utils/connectMongo";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "GET": {
      return getUserProfile(req, res);
    }
    case "PATCH": {
      return updateUserProfile(req, res);
    }
  }
}

// get a User
async function getUserProfile(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { id },
  } = req;
  try {
    await connectMongo();
    let user = await User.findById(id);
    return res.status(200).json({
      data: JSON.parse(JSON.stringify(user)),
      success: true,
    });
  } catch (error) {
    return res.json({
      message: error,
      success: false,
    });
  }
}

// add and update user category
async function updateUserProfile(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { id },
  } = req;
  try {
    await connectMongo();
    if (!req.body) {
      return res.status(400).json({
        error: "no request body",
      });
    }
    let user = await User.findById(id);

    if (req.body.name) {
      let existingItem: ICategory = user.category.find(
        (item: ICategory) => item.name === req.body.name.trim()
      );
      if (existingItem) {
        existingItem.score =
          req.body.score > existingItem.score
            ? req.body.score
            : existingItem.score;
        existingItem.attempts = existingItem.attempts + 1;
        existingItem.recentScore = req.body.score;
      } else {

        user.category.push(req.body);
      }
    } else if (req.body.image) {
      user.image = req.body.image;
    }
    let updatedUser = await user.save();
    if (updatedUser) {
     
      res.status(200).json({ message: "successful", updatedUser });
    } else {
      return res.status(400).json({
        error: "request not completed",
      });
    }
  } catch (error) {
    res.json(error);
  }
}
