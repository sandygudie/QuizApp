const baseUrl = "https://opentdb.com/api.php?amount=10";

export const getQuestions = async (id: number) => {
  let response = await fetch(`${baseUrl}&category=${id}`)
    .then((response) => response.json())
    .then((data) => data.results);
  return response;
};

export const getQuestionQuiz = async (category: string|any,difficulty:string|any) => {
  let response = await fetch(
    `https://quizbase.onrender.com/api/v1/quiz?category=${category}&difficulty=${difficulty}`
  )
    .then((response) => response.json())
    .then((data) => data.data);
  return response;
};

export const logOut = () => {
  localStorage.removeItem("currentUser");
};
