import React from "react";

export default function ProgressTracker({ tasks }) {
  const completedTasks = tasks.filter(
    (t) => t.completed
  ).length;

  const totalTasks = tasks.length;

  const percentage =
    totalTasks === 0
      ? 0
      : Math.round(
          (completedTasks / totalTasks) * 100
        );

  return (
    <div className="progress-tracker">
      <p>
        {completedTasks} out of {totalTasks} tasks Completed
      </p>

      <div className="progress-bar">
        <div
          className="progress"
          style={{
            width: `${percentage}%`,
          }}
        >
          {percentage}%
        </div>
      </div>
    </div>
  );
}