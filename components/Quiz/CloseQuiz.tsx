import React from "react";
import router from "next/router";

interface IProps {
  category: string | any;
  startQuiz: () => void;
}

function CloseQuiz({ category, startQuiz }: IProps) {
  const closeQuiz = () => {
    router.push("/");
  };
  const continueQuiz = () => {
    startQuiz();
  };

  return (
    <div>
      <h1 className="text-2xl text-center font-bold mb-4"> Quiz in progress</h1>
      <p className="text-center text-lg">
        Are you sure you want to stop the{" "}
        <span className="font-bold text-xl text-primary">{category}</span> quiz?
        This action will not save progress.
      </p>
      <div className="text-center flex items-center justify-around mt-8">
        <button
          className="p-3 px-6 w-40 text-white hover:bg-secondary/10 hover:text-secondary px-4 rounded-md bg-secondary font-bold"
          type="button"
          onClick={closeQuiz}
        >
          {" "}
          Continue
        </button>
        <button
          className="p-3 px-6 w-40 text-white font-bold hover:bg-primary/10 hover:text-secondary duration-300 px-4 rounded-md bg-primary"
          type="button"
          onClick={continueQuiz}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default CloseQuiz;
