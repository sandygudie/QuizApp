import React, { useEffect, useState } from "react";
import { IQuestion } from "../types";
import { useRouter } from "next/router";
import { getQuizData } from "../services/quizService";
import StartTimer from "../components/Quiz/StartTimer";
import QuizBoard from "../components/Quiz/QuizBoard";
import { getUser } from "../services/user";

function Quiz() {
  const router = useRouter();
  const data = router.query;
  const { id } = data;
  const [quizQuestions, setQuizQuestions] = useState<IQuestion[] | []>([]);
  const [start, setStart] = useState(true);

  useEffect(() => {
    const user = getUser();
    if (!user) {
      router.push("/login");
    }
    getQuizData(Number(id)).then((result) => {
      setQuizQuestions(result);
    });
  }, [data]);
  const setStartHandler = (start: boolean) => {
    setStart(start);
  };

  return (
    <div className="">
      {start ? (
        <StartTimer start={start} setStartHandler={setStartHandler} />
      ) : (
        <QuizBoard quizQuestions={quizQuestions} />
      )}
    </div>
  );
}

export default Quiz;
