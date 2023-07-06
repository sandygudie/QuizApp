const baseUrl = "https://opentdb.com/api.php?amount=10";

export const getQuestions = async (id: number) => {
  let response = await fetch(`${baseUrl}&category=${id}`)
    .then((response) => response.json())
    .then((data) => data.results);
  return response;
};

export const getQuestionQuiz = async (category: number) => {
  let response = await fetch(`/api/user&category=${category}`)
    .then((response) => response.json())
    .then((data) => data.results);
  return response;
};

export const logOut = () => {
  localStorage.removeItem("currentUser");
};
