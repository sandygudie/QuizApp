import router from "next/router";
import React from "react";
import { BsInfoCircle } from "react-icons/bs";
import { TiArrowBack } from "react-icons/ti";

interface IProps {
  category: string | any;
  timer: number;
  pauseQuiz: () => void;
  scoreStatus: "correct" | "wrong" | "timeup" | "finalscore" | "";
}

function QuizHeader({ pauseQuiz, timer, scoreStatus, category }: IProps) {
  return (
    <>
      <div className="shadow-xl ">
        <div className="z-30 xl:max-w-7xl m-auto flex font-bold text-slate-400 justify-between items-center w-full px-4 lg:px-4 lg:pr-20 py-5 md:py-6">
          <div className="flex items-center">
            <TiArrowBack
              onClick={() =>
                scoreStatus === "finalscore" ? router.push("/") : pauseQuiz()
              }
              className="text-xl md:text-4xl cursor-pointer"
            />

            <div className="mx-4 lg:mx-8 text-base md:text-xl">
              <span>Quiz: {category} </span>
            </div>
            <div
              className={`${
                scoreStatus === "finalscore" && "hidden sr-only"
              } md:flex items-center hidden`}
            >
              <BsInfoCircle className="text-xl inline mr-2" />
              <span className="italics">Answer each question in 10seconds</span>
            </div>
          </div>

          <div
            className={`${
              scoreStatus === "finalscore" && "hidden sr-only"
            }block sm:flex items-center justify-end text-lg md:text-2xl text-primary font-bold`}
          >
            <span className="">Timer: 00:</span>
            {timer <= 9 ? `0${timer}` : timer}
          </div>
        </div>
      </div>
    </>
  );
}

export default QuizHeader;
