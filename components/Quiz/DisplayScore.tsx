import Link from "next/link";
import React, { useEffect, useState } from "react";
import { getUser, setUser, updateUserData } from "../../services/user";
import ProgressBar from "../ProgressBar";
import { useRouter } from 'next/router'

interface IProps {
  correctAnswerCount: number;
  category: string | any;
}

export default function DisplayScore({ correctAnswerCount, category }: IProps) {
  const router = useRouter()

  let user_id = getUser()?._id;
  const [error, setError] = useState(" ");
  useEffect(() => {
    updateQuizScore();
  }, []);

  const updateQuizScore = async () => {
    let payload = {
      name: category,
      score: correctAnswerCount * 10,
      recentScore: correctAnswerCount * 10,
    };
    try {
      let response = await updateUserData(user_id, payload);
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
      <ProgressBar width={250} score={correctAnswerCount * 10} />

      <div className="flex w-full mt-8 font-bold items-center justify-between">
        <button onClick={() => router.reload()} className="p-3 text-white md:p-3 md:px-6 rounded-lg bg-primary" >
          Try Again
        </button>
        <Link className="p-3 text-white md:p-3 md:px-6 rounded-lg bg-primary opacity-20" href="#">
          Leader Board
        </Link>
      </div>
    </div>
  );
}
