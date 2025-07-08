import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ProgressTracker from "../components/Progresstracker";
import "./TestReport.css";

const TestReport = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { scores, recommendedStream } = location.state || {};

  useEffect(() => {
    if (!scores) navigate("/");
  }, [scores, navigate]);

  if (!scores) return null;

  const total = Object.values(scores).reduce((sum, val) => sum + val, 0);

  const getPercentage = (score) => {
    if (total === 0) return 0;
    return Math.round((score / total) * 100);
  };

  const isArray = Array.isArray(recommendedStream);
  const isUnattempted = recommendedStream === "Please attempt the test.";

  return (
    <div className="report-container">
      <h1>🎓 Your Career Test Report</h1>

      {/* 🔶 Special Message if test not attempted */}
      {isUnattempted ? (
        <div className="warning-box">
          ⚠️ You have not attempted the test completely.<br />
          That's why there was an error while evaluating the test.<br />
          <strong>Please attempt the test completely.</strong>
        </div>
      ) : (
        // ✅ Recommended Stream(s) Section
        <div className="stream-box">
          <strong>Recommended Stream{isArray ? "s" : ""}:</strong>
          <div className="highlight-stream">
            {isArray ? recommendedStream.join(", ") : recommendedStream}
          </div>
        </div>
      )}

      {/* 📊 Progress Bars */}
      <div className="progress-section">
        {Object.entries(scores).map(([stream, score]) => {
          const percent = getPercentage(score);
          return (
            <ProgressTracker
              key={stream}
              stream={stream}
              percentage={percent}
              raw={score}
            />
          );
        })}
      </div>

      <button className="btn primary" onClick={() => navigate("/")}>
        Go to Home
      </button>
    </div>
  );
};

export default TestReport;
