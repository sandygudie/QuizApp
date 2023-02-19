import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

interface IProgressBarProps {
  score: number;
  width: number;
  trailcolor?: string;
}
function ProgressBar({ score, width, trailcolor }: IProgressBarProps) {
  return (
    <div className="m-auto" style={{ width: width }}>
      <CircularProgressbar
        value={score}
        text={`${score}%`}
        className="text-tourquise text-sm font-bold"
        styles={buildStyles({
          rotation: 0,
          strokeLinecap: "round",
          textColor:
            score > 0 ? "hsl(171deg 47% 63%)" : "hsl(0deg 0% 84% / 7%)",
          pathColor:
            score > 50 ? `hsl(171deg 47% 63%)` : "hsl(171deg 47% 63% / 51%)",
          trailColor: trailcolor ? trailcolor : "hsl(0deg 0% 84% / 7%)",
        })}
      />
    </div>
  );
}

export default ProgressBar;
