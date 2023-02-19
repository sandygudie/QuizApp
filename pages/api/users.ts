import type { NextApiRequest, NextApiResponse } from "next";
import User from "../../models/user";
import connectMongo from "../../utils/connectMongo";

/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "GET": {
      return getUsers(res);
    }
  }
}

// Getting all Users.
async function getUsers(res: NextApiResponse) {
  try {
    await connectMongo();
    let users = await User.find({});
    return res.json({
      message: JSON.parse(JSON.stringify(users)),
      success: true,
    });
  } catch (error) {
    return res.json({
      message: error,
      success: false,
    });
  }
}
