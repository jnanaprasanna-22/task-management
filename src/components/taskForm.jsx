import React from "react";

function TaskForm({
  taskInput,
  setTaskInput,
  dueDate,
  setDueDate,
  priority,
  setPriority,
  category,
  setCategory,
  addTask,
  clearTasks,
}) {
  return (
    <div className="form-card">
      <input
        type="text"
        placeholder="Enter a task..."
        value={taskInput}
        onChange={(e) =>
          setTaskInput(e.target.value)
        }
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            addTask();
          }
        }}
      />

      <input
        type="date"
        value={dueDate}
        onChange={(e) =>
          setDueDate(e.target.value)
        }
      />

      <select
        value={priority}
        onChange={(e) =>
          setPriority(e.target.value)
        }
      >
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>

      <select
        value={category}
        onChange={(e) =>
          setCategory(e.target.value)
        }
      >
        <option value="Study">
          📚 Study
        </option>
        <option value="Work">
          💼 Work
        </option>
        <option value="Personal">
          🏠 Personal
        </option>
      </select>

      <button onClick={addTask}>
        Add Task
      </button>

      <button onClick={clearTasks}>
        Clear All
      </button>
    </div>
  );
}

export default TaskForm;