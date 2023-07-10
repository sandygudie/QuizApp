import React, { useEffect, useState } from "react";
import { IQuestion } from "../types";
import { useRouter } from "next/router";
import { getQuestionQuiz} from "../services/quizService";
import CountDown from "../components/Quiz/CountDown";
import QuizBoard from "../components/Quiz/QuizBoard";
import { getUser } from "../services/user";

function Quiz() {
  const router = useRouter();
  const data = router.query;
const {category,difficulty} = data
  const [quizQuestions, setQuizQuestions] = useState<IQuestion[] | []>([]);
  const [isCountdown, setIsCountdown] = useState(true);

  useEffect(() => {
    const user = getUser();
    if (!user) {
      router.push("/login");
    }
    getQuestionData();
  }, [data]);

  const getQuestionData = async () => {
    try {
      let result = await getQuestionQuiz(category,difficulty)
      // console.log(result)
      setQuizQuestions(result);

    } catch (error) {
      console.log(error);
    }
  };

  const setCountDownHandler = (counter: boolean) => {
    setIsCountdown(counter);
  };

  return (
    <div className="">
      {isCountdown ? (
        <CountDown isCountdown setCountDownHandler={setCountDownHandler} />
      ) : (
        <QuizBoard quizQuestions={quizQuestions} />
      )}
    </div>
  );
}

export default Quiz;
