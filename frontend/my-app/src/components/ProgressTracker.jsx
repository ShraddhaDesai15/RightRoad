// src/components/ProgressTracker.jsx
import React from "react";
import "./ProgressTracker.css";

const ProgressTracker = ({ stream, percentage, raw }) => {
  return (
    <div className="progress-tracker">
      <div className="progress-label">
        <strong>{stream}</strong>: {percentage}% ({raw} pts)
      </div>
      <div className="progress-bar-container">
        <div
          className="progress-bar"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressTracker;
