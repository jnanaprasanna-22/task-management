import React from "react";

function Header({
  darkMode,
  setDarkMode,

}) {
  return (
    <div className="header">
      <h1 className="title">
        📝 Task Management
      </h1>

      <div className="theme-toggle">
        <button
          className="theme-btn"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>
    </div>
  );
}



export default Header;