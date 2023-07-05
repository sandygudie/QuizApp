import React, { useEffect, useState } from "react";
import { IQuestion } from "../../types";
import { AiFillCheckCircle, AiFillCloseCircle } from "react-icons/ai";

interface IQuizProps {
  scoreStatus: "correct" | "wrong" | "timeup" | "finalscore" | "";
  ScoreStatusHandler: (
    scoreStatus: "correct" | "wrong" | "timeup" | "finalscore" | ""
  ) => void;
  correctAnswerCount: number;
  correctAnswerHandler: (correctAnswer: number) => void;
  quiz: IQuestion;
  index: number;
  stopQuiz: () => void;
  timer: number;
  nextQuestion: (timer: number) => void;
}

export default function QuestionCard({
  quiz,
  scoreStatus,
  correctAnswerCount,
  index,
  stopQuiz,
  timer,
  correctAnswerHandler,
  ScoreStatusHandler,
  nextQuestion,
}: IQuizProps) {
  const [optionsAnswers, setOptionsAnswers] = useState<any | []>(
    quiz.incorrect_answers
  );
  const [selectedIndex, setSelectedIndex] = useState<number>();

  useEffect(() => {
    let optionList = optionsAnswers.concat(quiz.correct_answer);
    let randomizedOptions = shuffleQuiz(optionList);
    setOptionsAnswers(randomizedOptions);
  }, []);

  const shuffleQuiz = (array: []) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  };

  function onChangeValue(index: number, event: any) {
    if (event.target.value === quiz.correct_answer) {
      event.currentTarget.style.backgroundColor = "green";
      event.currentTarget.style.color = "white";
      setSelectedIndex(index);
      ScoreStatusHandler("correct");
      correctAnswerHandler(correctAnswerCount + 1);
      const audioElement = new Audio("images/correct-answer.mp3");
      audioElement.play();
    } else {
      event.currentTarget.style.backgroundColor = "red";
      event.currentTarget.style.color = "white";
      setSelectedIndex(index);
      ScoreStatusHandler("wrong");
      const audioElement = new Audio("images/wrong-answer.wav");
      audioElement.play();
    }
    stopQuiz();
    setTimeout(() => {
      nextQuestion(6);
    }, 3000);
  }

  const entities: any = {
    "&#039;": "'",
    "&quot;": '"',
    "&ntilde;": "ñ",
    "&eacute;": "é",
    "&amp;": "&",
    "&uuml;": "ü",
  };
  return (
    <div className="w-full py-8 px-10 rounded-2xl">
      <h1 className="text-center text-primary font-bold text-2xl lg:text-3xl mb-8">
        {" "}
        Question {index < 9 ? `0${index + 1}` : index + 1}
        <span className="text-xl lg:text-2xl text-white/20">/10</span>
      </h1>
      <p className="bg-white font-bold p-5 text-primary text-lg md:text-xl rounded-lg mb-6">
        {quiz.question.replace(/&#?\w+;/g, (match) => entities[match])}
      </p>
      <div>
        {optionsAnswers.map((options: string, index: number) => {
          return (
            <label
              onChange={(e) => onChangeValue(index, e)}
              key={index}
              htmlFor={options}
              className={`px-3 py-2 bg-light-secondary cursor-pointer
               text-base md:text-lg font-bold my-5 rounded-xl 
                block ${
                  scoreStatus === "" &&
                  timer > 0 &&
                  "hover:text-primary hover:bg-white"
                } `}
            >
              <input
                type="radio"
                id={options}
                value={options}
                name="quiz"
                className="radio-input hidden"
                disabled={scoreStatus !== "" || timer === 0}
              />
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <p className="flex items-center justify-center bg-white rounded-full h-10 w-10 text-primary mr-3">
                    {" "}
                    {String.fromCharCode(index + 65)}
                  </p>
                  <span>{options} </span>
                </div>

                {selectedIndex === index &&
                  (scoreStatus === "correct" ? (
                    <AiFillCheckCircle className="font-bold fill-green-500 text-2xl" />
                  ) : scoreStatus === "wrong" ? (
                    <AiFillCloseCircle className="font-bold fill-green-500 text-2xl" />
                  ) : null)}
              </div>
            </label>
          );
        })}
      </div>
    </div>
  );
}
