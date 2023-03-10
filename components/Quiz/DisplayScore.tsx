import Link from "next/link";
import React, { useEffect, useState } from "react";
import { getUser, setUser, updateUser } from "../../services/user";
import ProgressBar from "../ProgressBar";

interface IDisplayScoreProps {
  correctAnswer: number;
  category: string | any;
}

export default function DisplayScore({
  correctAnswer,
  category,
}: IDisplayScoreProps) {
  let user_id = getUser()?._id;
  const [error, setError] = useState(" ");
  useEffect(() => {
    updatecategory();
  }, []);

  const updatecategory = async () => {
    let payload = {
      name: category,
      score: correctAnswer * 10,
      attempts: 1,
      recentScore: correctAnswer * 10,
      lastPlayedDate: Date(),
    };
    try {
      let response = await updateUser(user_id, payload);
      let data = await response.json();
      if (data.updatedUser) {
        setUser(data.updatedUser);
      }
    } catch (error) {
      setError("error");
    }
  };
  return (
    <div className="w-5/6 lg:w-1/4 absolute top-1/2 mt-8 left-2/4 translate-x-2/4 translate-y-2/4">
      <p className="font-bold text-2xl md:text-4xl text-center mb-6">
        {" "}
        Your Score
      </p>
      <ProgressBar width={250} score={correctAnswer * 10} />

      <div className="flex w-full mt-8 font-bold items-center justify-between">
        <Link className="p-3 px-6 rounded-lg bg-primary " href={"/"}>
          Try Again
        </Link>
        <Link className="p-3 px-6 rounded-lg bg-primary opacity-20" href="#">
          Leader Board
        </Link>
      </div>
    </div>
  );
}
