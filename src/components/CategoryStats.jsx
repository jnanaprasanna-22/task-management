import React from "react";

function CategoryStats({ tasks }) {
  const study = tasks.filter(
    (t) => t.category === "Study"
  ).length;

  const work = tasks.filter(
    (t) => t.category === "Work"
  ).length;

  const personal = tasks.filter(
    (t) => t.category === "Personal"
  ).length;

  return (
    <div className="category-stats">
      <div>📚 Study: {study}</div>
      <div>💼 Work: {work}</div>
      <div>🏠 Personal: {personal}</div>
    </div>
  );
}

export default CategoryStats;