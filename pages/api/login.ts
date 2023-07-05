import type { NextApiRequest, NextApiResponse } from "next";
import User from "../../models/user";
import { connectToDB } from "../../utils/connectMongo";
import { successResponse, errorResponse } from "../../utils/responseHandler";
import { loginValidation} from "../../utils/validator";
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
    await connectToDB();
    const { username, userId } = req.body;
    const { error } = loginValidation(req.body);
    if (error) return errorResponse(res, 400, error.details[0].message);

    const existingUser = await User.findOne({ username });
    if (!existingUser) {
      const user = await User.create(req.body);
      user.image = "images/avatar/baddie.png";
      await user.save();
      return successResponse(res, 201, "New account created", user);
    } else if (
      (existingUser && !userId) ||
      userId !== existingUser._id.toString()
    ) {
      return errorResponse(res, 400, "Username already exist");
    } else if (userId === existingUser._id.toString()) {
      return successResponse(res, 200, "login sucessful", existingUser);
    } else {
      return errorResponse(res, 400, "Wrong credentials");
    }
  } catch (error: any) {
    return errorResponse(res, 500, error.message);
  }
}
