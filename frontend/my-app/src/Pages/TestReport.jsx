import React, { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import ProgressTracker from "../components/ProgressTracker";

import "./TestReport.css";
import html2pdf from "html2pdf.js";

const TestReport = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const reportRef = useRef();
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

  const handleDownload = () => {
    const originalClass = document.body.className;
    document.body.classList.remove("dark-mode");

    const opt = {
      margin: 0.5,
      filename: "Career_Test_Report.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
      pagebreak: { mode: ['avoid-all', 'css', 'legacy'] },
    };

    html2pdf()
      .set(opt)
      .from(reportRef.current)
      .save()
      .then(() => {
        document.body.className = originalClass;
      });
  };

  return (
    <div className="report-page-wrapper">
      <div className="report-container">
        <div ref={reportRef}>
          <h1>🎓 Your Career Test Report</h1>

          {isUnattempted ? (
            <div className="warning-box">
              ⚠️ You have not attempted the test completely.<br />
              That's why there was an error while evaluating the test.<br />
              <strong>Please attempt the test completely.</strong>
            </div>
          ) : (
            <>
              <p>
                Congratulations on completing your career stream assessment! Based on
                your responses, we’ve evaluated your strengths and interest alignment
                across various academic streams.
              </p>

              <p>
                Below, you'll find a breakdown of how you scored in each stream category,
                along with your overall recommended stream. This insight is designed to
                help you make a more informed decision as you plan your future studies.
              </p>

              <div className="stream-box">
                <strong>Recommended Stream{isArray ? "s" : ""}:</strong>
                <div className="highlight-stream">
                  {isArray ? recommendedStream.join(", ") : recommendedStream}
                </div>
              </div>

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

              <p>
                This report reflects your compatibility with various academic streams and how well they align with your current skills, interests, and personality traits. While this recommendation provides a strong direction, it’s important to explore all options, research the opportunities available in each stream, and consult with parents, teachers, or career counselors before making your final decision.
              </p>

              <p>
                <strong>🔬 Science Stream:</strong><br />
                Ideal for students who enjoy logical thinking, problem-solving, and understanding the natural world. Science opens doors to over <strong>50+ career options</strong> in both core and interdisciplinary fields.<br />
                <u>Popular careers:</u> Engineering, Medicine, Biotechnology, Data Science, Architecture, Forensics, Astrophysics, Environmental Science.<br />
                <u>Skills needed:</u> Analytical thinking, strong math/science foundation, curiosity, patience.
              </p>

              <p>
                <strong>📊 Commerce Stream:</strong><br />
                Suitable for those interested in business, economics, and financial systems. Offers over <strong>30+ career options</strong> in fast-growing sectors.<br />
                <u>Popular careers:</u> Chartered Accountant (CA), Company Secretary (CS), Banking, Marketing, Entrepreneurship, E-commerce, Economist.<br />
                <u>Skills needed:</u> Numerical ability, strategic thinking, business awareness, communication.
              </p>

              <p>
                <strong>🎨 Arts / Humanities Stream:</strong><br />
                Perfect for creative thinkers and those interested in society, culture, and human behavior. Leads to over <strong>40+ career options</strong>.<br />
                <u>Popular careers:</u> Lawyer, Psychologist, Journalist, UI/UX Designer, Civil Services, Social Worker, Historian, Educator.<br />
                <u>Skills needed:</u> Creativity, empathy, communication, critical thinking, observation.
              </p>

              <p>
                <strong>💡 Final Advice:</strong><br />
                Every stream has unique opportunities. Choose what resonates with your strengths and interests. Your recommended stream is based on current aptitude, but real success comes from continuous learning and passion for your chosen path.
              </p>
            </>
          )}
        </div>

        <div className='download' style={{ marginTop: "20px" }}>
          <button className="btn primary" onClick={() => navigate("/")}>
            Go to Home
          </button>
          {!isUnattempted && (
            <button className="btn secondary" onClick={handleDownload}>
              ⬇️ Download Report PDF
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TestReport;
