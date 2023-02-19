const baseUrl = "https://opentdb.com/api.php?amount=10";

export const getQuizData = async (id: number) => {
  let response = await fetch(`${baseUrl}&category=${id}`)
    .then((response) => response.json())
    .then((data) => data.results);
  return response;
};

export const logOut = () => {
  localStorage.removeItem("currentUser");
};
