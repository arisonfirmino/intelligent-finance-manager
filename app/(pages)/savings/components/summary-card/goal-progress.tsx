"use client";

import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const GoalProgress = ({
  progressPercentage,
}: {
  progressPercentage: number;
}) => {
  return (
    <div className="h-10 w-10">
      <CircularProgressbar
        value={progressPercentage}
        text={`${progressPercentage}%`}
        styles={buildStyles({
          textSize: "24px",
          textColor: "#3B82F6",
        })}
      />
    </div>
  );
};

export default GoalProgress;
