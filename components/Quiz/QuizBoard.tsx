import React, { useEffect, useState } from "react";
import { IQuestion } from "../../types";
import QuizHeader from "./QuizHeader";
import DisplayScore from "./DisplayScore";
import QuestionCard from "./QuestionCard";
import { useRouter } from "next/router";
import Modal from "../Modal";
import CloseQuiz from "./CloseQuiz";
import { CgSpinner } from "react-icons/cg";

interface IQuizBoardProps {
  quizQuestions: IQuestion[];
}

export default function QuizBoard({ quizQuestions }: IQuizBoardProps) {
  const router = useRouter();

  const data = router.query;

  const { category } = data;
  let audioElement: HTMLAudioElement;

  const [isOpenModal, setIsOpenModal] = useState(false);
  let [timer, setTimer] = useState(10);
  const [correctAnswerCount, setCorrectAnswerCount] = useState(0);
  let [questionCounter, setQuestionCounter] = useState(0);
  const [status, setStatus] = useState<"running" | "pause" | "stop">("running");
  const [scoreStatus, setScoreStatus] = useState<
    "correct" | "wrong" | "timeup" | "finalscore" | ""
  >("");

  useEffect(() => {
    let interval: string | number | NodeJS.Timeout | undefined;
    if (quizQuestions.length) {
      if (status === "running") {
        interval = setInterval(() => {
          // time up
          if (timer === 1) {
            setStatus("stop");
            setScoreStatus("timeup");
            audioElement = new Audio("images/time-up.wav");
            audioElement.play();
            setTimeout(() => {
              nextQuestion();
            }, 3000);
          }
          setTimer((timer = timer - 1));
        }, 1000);
      } else if (status === "pause") {
        clearInterval(interval);
      } else {
        clearInterval(interval);
      }
    } else {
      setTimer(0);
    }
    return () => clearInterval(interval);
  }, [timer, status]);

  const correctAnswerHandler = (correctAnswerCount: number) => {
    setCorrectAnswerCount(correctAnswerCount);
  };

  const ScoreStatusHandler = (
    scoreStatus: "correct" | "wrong" | "timeup" | "finalscore" | ""
  ) => setScoreStatus(scoreStatus);

  const nextQuestion = () => {
    setQuestionCounter((questionCounter = questionCounter + 1));
    if (questionCounter < quizQuestions.length) {
      setTimer(10);
      setStatus("running");
      setScoreStatus("");
    } else {
      setStatus("stop");
      setTimer(0);
      setScoreStatus("finalscore");
    }
  };

  const pauseQuiz = () => {
    setIsOpenModal(true);
    setStatus("pause");
  };

  const startQuiz = () => {
    setIsOpenModal(false);
    setStatus("running");
  };

  const stopQuiz = () => {
    setStatus("stop");
  };

  const TimeUpComponent = () => {
    return (
      <div className="z-50 font-bold absolute top-2/4 left-2/4 translate-x-2/4 translate-y-2/4">
        <p className="swirl-in-fwd text-center text-7xl md:text-[10em] text-red">
          Time Up
        </p>
      </div>
    );
  };
  return (
    <>
      <div className={`${isOpenModal && "opacity-20"}`}>
        <QuizHeader
          category={category}
          pauseQuiz={pauseQuiz}
          timer={timer}
          scoreStatus={scoreStatus}
        />
        {scoreStatus === "finalscore" ? (
          <DisplayScore
            category={category}
            correctAnswerCount={correctAnswerCount}
          />
        ) : (
          <>
            <div className="z-10 w-full md:w-[30rem] lg:w-[35rem] absolute top-2/4 left-2/4 translate-x-2/4 translate-y-2/4 mt-10">
              {quizQuestions.length === 0 ? (
                <p className="text-center font-bold">
                  {" "}
                  Quiz Loading{" "}
                  <CgSpinner className="animate-spin block m-auto w-10 h-10" />
                </p>
              ) : (
                <>
                  {quizQuestions.map((list, i) => {
                    return (
                      i === questionCounter && (
                        <QuestionCard
                          scoreStatus={scoreStatus}
                          correctAnswerCount={correctAnswerCount}
                          quiz={list}
                          index={i}
                          key={i}
                          stopQuiz={stopQuiz}
                          timer={timer}
                          ScoreStatusHandler={ScoreStatusHandler}
                          nextQuestion={nextQuestion}
                          correctAnswerHandler={correctAnswerHandler}
                        />
                      )
                    );
                  })}
                </>
              )}
            </div>
            {scoreStatus === "timeup" && <TimeUpComponent />}
          </>
        )}
      </div>
      {isOpenModal && (
        <Modal>
          <CloseQuiz startQuiz={startQuiz} category={category} />
        </Modal>
      )}
    </>
  );
}
