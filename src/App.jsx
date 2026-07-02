import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./style.css";

import Header from "./components/Header";
import Stats from "./components/Stats";
import CategoryStats from "./components/CategoryStats";
import ProgressTracker from "./components/ProgressTracker";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [taskInput, setTaskInput] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [category, setCategory] = useState("Study");

  const [editingIndex, setEditingIndex] = useState(null);
  const [editText, setEditText] = useState("");

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("none");
  const [categoryFilter, setCategoryFilter] =
    useState("All");

  const [darkMode, setDarkMode] = useState(() => {
  const savedTheme = localStorage.getItem("darkMode");
  return savedTheme ? JSON.parse(savedTheme) : false;
  });
  useEffect(() => {
  localStorage.setItem(
    "darkMode",
    JSON.stringify(darkMode)
  );
  }, [darkMode]);
  // Save tasks
  useEffect(() => {
    localStorage.setItem(
      "tasks",
      JSON.stringify(tasks)
    );
  }, [tasks]);

  // Add Task
  const addTask = () => {
    if (!taskInput.trim()) return;

    setTasks([
      ...tasks,
      {
        id: Date.now(),
        text: taskInput,
        completed: false,
        dueDate,
        priority,
        category,
        favorite: false,
      },
    ]);

    toast.success("Task Added Successfully!");

    setTaskInput("");
    setDueDate("");
    setPriority("Medium");
    setCategory("Study");
  };

  // Update Task
  const updateTask = (
    updatedTask,
    index
  ) => {
    const newTasks = [...tasks];
    newTasks[index] = updatedTask;
    setTasks(newTasks);
  };

  // Delete Task
  const deleteTask = (index) => {
    setTasks(
      tasks.filter((_, i) => i !== index)
    );
    toast.error("Task Deleted!");
  };

  // Clear All
  const clearTasks = () => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete all tasks?"
  );

  if (confirmDelete) {
    setTasks([]);
    toast.info("All Tasks Cleared!");
  }
};

  // Statistics
  const completedTasks = tasks.filter(
    (task) => task.completed
  ).length;

  // Search + Filter
  const filteredTasks = tasks.filter(
    (task) => {
      const matchesSearch = task.text
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory =
        categoryFilter === "All" ||
        task.category === categoryFilter;

      if (filter === "completed") {
        return (
          matchesSearch &&
          matchesCategory &&
          task.completed
        );
      }

      if (filter === "pending") {
        return (
          matchesSearch &&
          matchesCategory &&
          !task.completed
        );
      }

      return (
        matchesSearch &&
        matchesCategory
      );
    }
  );

  // Sorting
  const sortedTasks = [...filteredTasks];

  sortedTasks.sort((a, b) => {
    if (a.favorite === b.favorite)
      return 0;

    return a.favorite ? -1 : 1;
  });

  if (sortBy === "priority") {
    const priorityOrder = {
      High: 3,
      Medium: 2,
      Low: 1,
    };

    sortedTasks.sort(
      (a, b) =>
        priorityOrder[b.priority] -
        priorityOrder[a.priority]
    );
  }

  if (sortBy === "date") {
    sortedTasks.sort(
      (a, b) =>
        new Date(
          a.dueDate || "9999-12-31"
        ) -
        new Date(
          b.dueDate || "9999-12-31"
        )
    );
  }
  
  return (
    <div className={darkMode ? "app dark" : "app"}>
      <div className="container">
        <Header
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          taskCount={tasks.length}
        />

        <Stats
          tasks={tasks}
          completedTasks={completedTasks}
        />

        <CategoryStats tasks={tasks} />

        <ProgressTracker tasks={tasks} />

        <TaskForm
          taskInput={taskInput}
          setTaskInput={setTaskInput}
          dueDate={dueDate}
          setDueDate={setDueDate}
          priority={priority}
          setPriority={setPriority}
          category={category}
          setCategory={setCategory}
          addTask={addTask}
          clearTasks={clearTasks}
        />

        <div className="controls">
          <input
            className="search-box"
            type="text"
            placeholder="🔍 Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            value={categoryFilter}
            onChange={(e) =>
              setCategoryFilter(e.target.value)
            }
          >
            <option value="All">All</option>
            <option value="Study">📚 Study</option>
            <option value="Work">💼 Work</option>
            <option value="Personal">🏠 Personal</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) =>
              setSortBy(e.target.value)
            }
          >
            <option value="none">No Sorting</option>
            <option value="priority">Priority</option>
            <option value="date">Due Date</option>
          </select>

          <button onClick={() => setFilter("all")}>
            All
          </button>

          <button
            onClick={() =>
              setFilter("completed")
            }
          >
            Completed
          </button>

          <button
            onClick={() =>
              setFilter("pending")
            }
          >
            Pending
          </button>
        </div>
      </div>

      <TaskList
        sortedTasks={sortedTasks}
        editingIndex={editingIndex}
        setEditingIndex={setEditingIndex}
        editText={editText}
        setEditText={setEditText}
        updateTask={updateTask}
        deleteTask={deleteTask}
        toast={toast}
      />

      {sortedTasks.length === 0 && (
        <div className="empty-state">
          <h2>📝 No Tasks Found</h2>
          <p>Add your first task or change the filters.</p>
        </div>
      )}

      <ToastContainer
        position="top-right"
        autoClose={2000}
      />
    </div>
  );
}

export default App;