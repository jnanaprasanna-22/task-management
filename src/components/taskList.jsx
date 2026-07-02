import React from "react";

function TaskList({
  sortedTasks,
  editingIndex,
  setEditingIndex,
  editText,
  setEditText,
  updateTask,
  deleteTask,
  toast,
}) {
    const today = new Date()
  .toISOString()
  .split("T")[0];
  return (
    <ul>
      {sortedTasks.map((task, index) => (
        <li key={task.id} className="task-card">
          {editingIndex === index ? (
            <>
              <input
                value={editText}
                onChange={(e) =>
                  setEditText(e.target.value)
                }
              />

              <button
                className="action-btn"
                onClick={() => {
                  updateTask(
                    {
                      ...task,
                      text: editText,
                    },
                    index
                  );

                  toast.info("Task Updated!");
                  setEditingIndex(null);
                }}
              >
                Save
              </button>
            </>
          ) : (
            <>
              <div>
                <div className="task-header">
                  <span
                    className={
                      task.completed
                        ? "completed-task"
                        : ""
                    }
                  >
                    {task.text}
                  </span>
                </div>

                <div className="task-details">
                  {task.dueDate && (
                    <span>
                      📅 {task.dueDate}
                    </span>
                  )}
                  {task.dueDate === today && (
                    <span className="due-today">
                        ⚠️ Due Today
                    </span>
                    )}

                    {task.dueDate &&
                    task.dueDate < today &&
                    !task.completed && (
                        <span className="overdue">
                        ❌ Overdue
                        </span>
                    )}
                </div>

                <div className="task-category">
                  {task.category === "Study" &&
                    "📚 Study"}
                  {task.category === "Work" &&
                    "💼 Work"}
                  {task.category === "Personal" &&
                    "🏠 Personal"}
                </div>
              </div>

              <div
                className={
                  task.priority === "High"
                    ? "priority-high"
                    : task.priority === "Medium"
                    ? "priority-medium"
                    : "priority-low"
                }
              >
                Priority: {task.priority}
              </div>

              <button
                className="action-btn favorite-btn"
                onClick={() =>
                  updateTask(
                    {
                      ...task,
                      favorite: !task.favorite,
                    },
                    index
                  )
                }
              >
                {task.favorite ? "⭐" : "☆"}
              </button>

              <button
                className="action-btn complete-btn"
                onClick={() => {
                  updateTask(
                    {
                      ...task,
                      completed:
                        !task.completed,
                    },
                    index
                  );

                  toast.success(
                    task.completed
                      ? "Task Marked Pending!"
                      : "Task Completed!"
                  );
                }}
              >
                {task.completed
                  ? "Undo"
                  : "Complete"}
              </button>

              <button
                className="action-btn edit-btn"
                onClick={() => {
                  setEditingIndex(index);
                  setEditText(task.text);
                }}
              >
                Edit
              </button>

              <button
                className="action-btn delete-btn"
                onClick={() =>
                  deleteTask(index)
                }
              >
                Delete
              </button>
            </>
          )}
        </li>
      ))}
    </ul>
  );
}

export default TaskList;