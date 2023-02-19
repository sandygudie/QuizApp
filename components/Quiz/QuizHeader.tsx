import { useRouter } from "next/router";
import React, { useState } from "react";
import { BsInfoCircle } from "react-icons/bs";
import { TiArrowBack } from "react-icons/ti";

interface IQuizProps {
  category: string | any;
  timer: number;
  goBack: () => void;
  scoreStatus: "correct" | "wrong" | "timeup" | "finalscore" | "";
}

function Display({ goBack, timer, scoreStatus, category }: IQuizProps) {
  return (
    <>
      <div className="flex shadow-xl font-bold text-slate-400 justify-between items-center w-full px-2 lg:px-4 lg:pr-20 py-6">
        <div className="flex items-center w-full md:w-3/4 lg:w-1/2">
          <TiArrowBack
            onClick={() => goBack()}
            className={`${scoreStatus === "finalscore" && "hidden"} text-4xl`}
          />

          <div className="mx-4 lg:mx-8 text-lg md:text-xl">
            <span> {category} Quiz</span>
          </div>
          <div
            className={`${
              scoreStatus === "finalscore" && "hidden sr-only"
            } md:flex items-center hidden`}
          >
            <BsInfoCircle className="text-xl inline mr-2" />
            <span className="italics">Answer each question in 30seconds</span>
          </div>
        </div>

        <div
          className={`${
            scoreStatus === "finalscore" && "hidden sr-only"
          } flex items-center w-48 justify-end text-xl md:text-2xl text-primary font-bold`}
        >
          <span className="">Timer: 00:</span>
          {timer <= 9 ? `0${timer}` : timer}
        </div>
      </div>
    </>
  );
}

export default Display;

// Add modal for are you sure you want to go back?
