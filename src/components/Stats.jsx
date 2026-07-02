import React from "react";

function Stats({
  tasks,
  completedTasks,
}) {
  return (
    <div className="stats">
      <div className="stat-box">
        <div className="stat-icon">📋</div>

        <div>
          <h2>{tasks.length}</h2>
          <p>Total Tasks</p>
        </div>
      </div>

      <div className="stat-box">
        <div className="stat-icon completed">
          ✅
        </div>

        <div>
          <h2>{completedTasks}</h2>
          <p>Completed</p>
        </div>
      </div>

      <div className="stat-box">
        <div className="stat-icon pending">
          🕒
        </div>

        <div>
          <h2>
            {tasks.length - completedTasks}
          </h2>
          <p>Pending</p>
        </div>
      </div>
    </div>
  );
}

export default Stats;