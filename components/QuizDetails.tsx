import React from "react";
import { ICategory, IUser } from "../types";
import ProgressBar from "./ProgressBar";
interface IProps {
  item: ICategory | any;
}
export default function QuizDetails({ item }: IProps) {
  console.log(item);
  return (
    <div key={item._id} className="text-center">
      <div>
        <p className="font-bold text-xl lg:text-2xl mb-6">{item.name}</p>
        <ProgressBar
          width={150}
          score={item.score}
          trailcolor={"hsl(240deg 8% 93%)"}
        />
      </div>

      <div className="font-medium my-6">
        <p>
          {" "}
          Attempts: <span>{item.attempts}</span>
        </p>
        <p> Last Played Score: {item.recentScore}%</p>
        <p> Last Played : {new Date(item.lastPlayedDate).toDateString()}</p>
      </div>
    </div>
  );
}
