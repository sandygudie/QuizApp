import type { NextApiRequest, NextApiResponse } from "next";
import User from "../../../models/user";
import { ICategory } from "../../../types";
import { connectToDB } from "../../../utils/connectMongo";
import { categoryValidation } from "../../../utils/validator";
import { errorResponse } from "../../../utils/responseHandler";

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
    await connectToDB();
    let user = await User.findById(id);
    if (!user) {
      return res.status(400).json({
        message: "User does not exist",
        success: false,
      });
    }

    return res.status(200).json({
      data: JSON.parse(JSON.stringify(user)),
      success: true,
    });
  } catch (error) {
    return res.status(400).json({
      message: error || "bad Request",
      success: false,
    });
  }
}


async function updateUserProfile(req: NextApiRequest, res: NextApiResponse) {
  const { id }: string | any = req.query;

  try {
    await connectToDB();
    if (!req.body) {
      return res.status(400).json({
        error: "no request body",
      });
    }
   

    let user = await User.findById(id);
    if (!user) {
      return res
        .status(400)
        .json({ message: "User does not exist", success: false });
    }


    if (req.body.name) {
      const { error } = categoryValidation(req.body);
      if (error) return errorResponse(res, 400, error.details[0].message);
      
      const existingCategory = user.category.find(
        (ele: ICategory) => ele.name === req.body.name
      );
      if (existingCategory) {
        (existingCategory.score =
          req.body.score > existingCategory.score
            ? req.body.score
            : existingCategory.score),
          (existingCategory.attempts = existingCategory.attempts + 1);
        existingCategory.recentScore = req.body.recentScore;
        existingCategory.updatedDate = Date.now();
      } else {
        user.category.push({
          ...req.body,
          attempts: 1,
          updatedDate: Date.now(),
        });
      }
    } else if (req.body.image) {
      user.image = req.body.image;
    }
    let updatedUser = await user.save();
    if (updatedUser) {
      res.status(200).json({ message: "successful", updatedUser });
    } else {
      return res.status(400).json({
        error: "Request not completed",
      });
    }
  } catch (error) {
    return res.status(400).json({ message: error || "Bad Request" });
  }
}
