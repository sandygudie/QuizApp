import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

interface IProgressBarProps {
  score: number;
  width: number;
  trailcolor?: string;
}
function ProgressBar({ score, width, trailcolor }: IProgressBarProps) {
  return (
    <div className="m-auto" style={{ width: width }}>
      <CircularProgressbar
        value={score}
        text={`${score}%`}
        className="text-tourquise text-sm font-bold"
        styles={buildStyles({
          rotation: 0,
          strokeLinecap: "round",
          textColor:
            score > 0 ? "hsl(171deg 47% 63%)" : "hsl(0deg 0% 84% / 7%)",
          pathColor:
            score > 50 ? `hsl(171deg 47% 63%)` : "hsl(171deg 47% 63% / 51%)",
          trailColor: trailcolor ? trailcolor : "hsl(0deg 0% 84% / 7%)",
        })}
      />
    </div>
  );
}

export default ProgressBar;


// import type { NextApiRequest, NextApiResponse } from "next";
// import User from "../../../models/user";
// import { ICategory } from "../../../types";
// import { connectToDB } from "../../../utils/connectMongo";
// import Category from "../../../models/category";

// export default function handler(req: NextApiRequest, res: NextApiResponse) {
//   switch (req.method) {
//     case "GET": {
//       return getUserProfile(req, res);
//     }
//     case "PATCH": {
//       return updateUserProfile(req, res);
//     }
//   }
// }

// // get a User
// async function getUserProfile(req: NextApiRequest, res: NextApiResponse) {
//   const {
//     query: { id },
//   } = req;

//   try {
//     await connectToDB();
//     let user = await User.findById(id).populate("category");
//     return res.status(200).json({
//       data: JSON.parse(JSON.stringify(user)),
//       success: true,
//     });
//   } catch (error) {
//     return res.json({
//       message: error,
//       success: false,
//     });
//   }
// }

// // add and update user category
// async function updateUserProfile(req: NextApiRequest, res: NextApiResponse) {
//   const { id }: string | any = req.query;

//   try {
//     await connectToDB();
//     if (!req.body) {
//       return res.status(400).json({
//         error: "no request body",
//       });
//     }
//     let user = await User.findById(id).populate("category");

//     // addd validation for reqbody
//     if (req.body.name) {
//       let category = await Category.findOne({
//         userId: id,
//         name: req.body.name.trim(),
//       });

//       if (category) {
//         const updatedCategory = await Category.findByIdAndUpdate(
//           { _id: category._id },
//           {
//             score:
//               req.body.score > category.score ? req.body.score : category.score,
//             attempts: category.attempts + 1,
//             recentScore: req.body.recentScore,
//           },
//           { new: true }
//         );
//         console.log(updatedCategory)
//       await User.updateOne(
//          { _id: id, "category._id": updatedCategory._id },
//           {
//             $set: {
//               "category.$.score": updatedCategory.score,
//               "category.$.attempts": updatedCategory.attempts,
//               "category.$.recentScore": updatedCategory.recentScore,
//             },
//           }
//         );
//       } else {
//         const newCat = await Category.create(req.body);
//         await User.updateOne({ _id: id }, { $push: { category: newCat } });
//       }
//     } else if (req.body.image) {
//       user.image = req.body.image;
//     }
//     let updatedUser = await user.save();
//     if (updatedUser) {
//       const populatedUser = await User.findById(id).populate("category");
//       res.status(200).json({ message: "successful", populatedUser });
//     } else {
//       return res.status(400).json({
//         error: "Request not completed",
//       });
//     }
//   } catch (error) {
//     return res.status(400).json({ message: error || "Bad Request" });
//   }
// }
