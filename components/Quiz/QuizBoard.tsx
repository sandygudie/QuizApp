import React, { useEffect, useState } from "react";
import { IQuestion } from "../../types";
import QuizHeader from "./QuizHeader";
import DisplayScore from "./DisplayScore";
import QuestionCard from "./QuestionCard";
import Score from "./Score";
import { useRouter } from "next/router";
import Modal from "../Modal";
import CloseQuiz from "./CloseQuiz";

interface IQuizBoardProps {
  quizQuestions: IQuestion[];
}

export default function QuizBoard({ quizQuestions }: IQuizBoardProps) {
  const [isOpenModal, setIsOpenModal] = useState(false);

  let audioElement: HTMLAudioElement;
  let [timer, setTimer] = useState(6);
  const [correctAnswer, setCorrectAnswer] = useState(0);
  let [questionAmount, setQuestionAmount] = useState(0);
  const [quizTiming, setQuizTiming] = useState(true);
  const [scoreStatus, setScoreStatus] = useState<
    "correct" | "wrong" | "timeup" | "finalscore" | ""
  >("");

  const [status, setStatus] = useState("running");
  const router = useRouter();
  const data = router.query;
  const { id, category } = data;

  useEffect(() => {
    let interval: string | number | NodeJS.Timeout | undefined;
    if (quizQuestions.length) {
      if (quizTiming && status === "running") {
        interval = setInterval(() => {
          // time up
          if (timer === 1) {
            setQuizTiming(false); //stop timing
            setScoreStatus("timeup");
            audioElement = new Audio("images/time-up.wav");
            audioElement.play();
            setTimeout(() => {
              nextQuestion(6);
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
  }, [quizTiming, timer, status]);

  const quizTimingHandler = (quizTiming: boolean) => {
    setQuizTiming(quizTiming);
  };
  const correctAnswerHandler = (correctAnswer: number) => {
    setCorrectAnswer(correctAnswer);
  };

  const ScoreStatusHandler = (
    scoreStatus: "correct" | "wrong" | "timeup" | "finalscore" | ""
  ) => setScoreStatus(scoreStatus);

  const nextQuestion = (timer: number) => {
    setQuestionAmount((questionAmount = questionAmount + 1));
    if (questionAmount < quizQuestions.length) {
      setTimer(timer);
      setQuizTiming(true);
      setScoreStatus("");
    } else {
      setQuizTiming(true);
      setTimer(0);
      setScoreStatus("finalscore");
    }
  };

  const goBack = () => {
    setIsOpenModal(true);
    setStatus("pause");
  };
 
  const handleStatus = () => {
    setIsOpenModal(false);
    setStatus("running");
  };

  return (
    <>
      <div className={`${isOpenModal && "opacity-20"}`}>
        <QuizHeader
          category={category}
          goBack={goBack}
          timer={timer}
          scoreStatus={scoreStatus}
        />
        {scoreStatus === "finalscore" ? (
          <DisplayScore category={category} correctAnswer={correctAnswer} />
        ) : (
          <>
            <div className="z-10 w-full md:w-auto absolute top-2/4 left-2/4 translate-x-2/4 translate-y-2/4 mt-10">
              {quizQuestions.length === 0 ? (
                <p> Quiz Loading</p>
              ) : (
                <>
                  {quizQuestions.map((list, i) => {
                    return (
                      i === questionAmount && (
                        <QuestionCard
                          scoreStatus={scoreStatus}
                          correctAnswer={correctAnswer}
                          quiz={list}
                          index={i}
                          key={i}
                          quizTimingHandler={quizTimingHandler}
                          timer={timer}
                          ScoreStatusHandler={ScoreStatusHandler}
                          nextQuestion={nextQuestion}
                          correctAnswerHandler={correctAnswerHandler}
                        />
                      )
                    );
                  })}{" "}
                </>
              )}
            </div>
            {scoreStatus !== "" && <Score scoreStatus={scoreStatus} />}
          </>
        )}
      </div>
      {isOpenModal && (
        <Modal
          children={
            <CloseQuiz

              handleStatus={handleStatus}
              category={category}
            />
          }
        />
      )}
    </>
  );
}
