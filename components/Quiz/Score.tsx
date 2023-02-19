import React from "react";

interface IScoreProps {
  scoreStatus: "correct" | "wrong" | "timeup" | "finalscore" | "";
}
function Score({ scoreStatus }: IScoreProps) {
  return (
    <div className="z-50 font-bold absolute top-2/4 left-2/4 translate-x-2/4 translate-y-2/4">
      {scoreStatus === "timeup" && (
        <p className="swirl-in-fwd text-center text-7xl md:text-[10em] text-red">
          Time Up
        </p>
      )}
    </div>
  );
}

export default Score;
