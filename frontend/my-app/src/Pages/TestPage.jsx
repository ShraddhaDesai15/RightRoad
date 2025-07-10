// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import QuestionCard from "../components/QuestionCard";
// import "./TestPage.css";

// const TestPage = () => {
//   const [questions, setQuestions] = useState([]);
//   const [answers, setAnswers] = useState({});
//   const [currentPage, setCurrentPage] = useState(0);
//   const [timeLeft, setTimeLeft] = useState(60 * 60); // 1 hour
//   const [showConfirmModal, setShowConfirmModal] = useState(false);

//   const questionsPerPage = 5;
//   const totalQuestions = 60;
//   const navigate = useNavigate();

//   // ✅ Fetch questions from backend
//   useEffect(() => {
//     const fetchQuestions = async () => {
//       try {
//         const res = await fetch("http://localhost:5000/api/questions");
//         const questionsData = await res.json();

//         const allQuestions = [
//           ...questionsData.Science,
//           ...questionsData.Commerce,
//           ...questionsData.Arts,
//           ...questionsData.Compatibility,
//         ];

//         const shuffled = allQuestions.sort(() => 0.5 - Math.random()).slice(0, totalQuestions);
//         setQuestions(shuffled);
//       } catch (err) {
//         console.error("❌ Failed to fetch questions:", err.message || err);
//         alert("Could not load questions. Please try again.");
//       }
//     };

//     fetchQuestions();
//   }, []);

//   // ⏱ Timer countdown
//   useEffect(() => {
//     const timer = setInterval(() => {
//       setTimeLeft((prev) => {
//         if (prev <= 1) {
//           clearInterval(timer);
//           submitTest();
//           return 0;
//         }
//         return prev - 1;
//       });
//     }, 1000);
//     return () => clearInterval(timer);
//   }, []);

//   // Scroll to top on question page change
//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, [currentPage]);

//   const formatTime = (seconds) => {
//     const mins = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
//   };

//   const handleOptionSelect = (questionIndex, option) => {
//     setAnswers({ ...answers, [questionIndex]: option });
//   };

//   const totalPages = Math.ceil(questions.length / questionsPerPage);
//   const currentQuestions = questions.slice(
//     currentPage * questionsPerPage,
//     (currentPage + 1) * questionsPerPage
//   );

//   const handleSubmit = () => {
//     if (Object.keys(answers).length === totalQuestions) {
//       submitTest();
//     } else {
//       setShowConfirmModal(true);
//     }
//   };

//   // ✅ Correct Submit Test
//   const submitTest = async () => {
//     try {
//       if (!questions.length) {
//         alert("❌ Questions not loaded yet.");
//         return;
//       }

//       const responses = questions.map((q, index) => ({
//         question: q.question,
//         selected: answers[index] || null,
//       }));

//       const response = await fetch("http://localhost:5000/api/responses", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ responses }),
//       });

//       if (!response.ok) throw new Error("Submission failed");

//       const result = await response.json();
//       navigate("/testreport", { state: result });

//     } catch (error) {
//       console.error("❌ Submission failed:", error);
//       alert("❌ Submission failed. Please try again later.");
//     }
//   };

//   return (
//     <div className="testpage-container force-light-mode">
//       <aside className="sidebar">
//         <div className="timer">⏰ {formatTime(timeLeft)}</div>
//         <h2>Questions</h2>
//         <div className="question-nav">
//           {questions.map((_, i) => (
//             <button
//               key={i}
//               className={`question-num ${answers[i] ? "answered" : ""}`}
//               onClick={() => setCurrentPage(Math.floor(i / questionsPerPage))}
//             >
//               {i + 1}
//             </button>
//           ))}
//         </div>

//         <button onClick={handleSubmit} className="submit-btn">
//           Submit Test
//         </button>
//       </aside>

//       <main className="main-area">
//         <h1>Test Questions</h1>
//         <div className="question-list">
//           {currentQuestions.map((q, i) => (
//             <QuestionCard
//               key={i + currentPage * questionsPerPage}
//               questionData={q}
//               questionIndex={i + currentPage * questionsPerPage}
//               selectedOption={answers[i + currentPage * questionsPerPage]}
//               handleOptionSelect={handleOptionSelect}
//             />
//           ))}
//         </div>

//         <div className="pagination">
//           <button
//             onClick={() => setCurrentPage((p) => Math.max(p - 1, 0))}
//             disabled={currentPage === 0}
//           >
//             Previous
//           </button>
//           {currentPage === totalPages - 1 ? (
//             <button onClick={handleSubmit} className="submit-btn-inline">
//               Submit
//             </button>
//           ) : (
//             <button lassName="next-btn"
//               onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages - 1))}
//             >
//               Next
//             </button>
//           )}
//         </div>
//       </main>

//       {showConfirmModal && (
//         <div className="custom-alert-overlay">
//           <div className="custom-alert-box">
//             <h2>⚠️ Incomplete Test</h2>
//             <p>
//               You haven’t answered all 60 questions. Submitting now may lead to
//               inaccurate results.
//             </p>
//             <div className="alert-buttons">
//               <button onClick={() => setShowConfirmModal(false)}>
//                 Go Back to Test
//               </button>
//               <button
//                 onClick={() => {
//                   setShowConfirmModal(false);
//                   submitTest();
//                 }}
//                 disabled={!questions.length}
//               >
//                 End Test Anyway
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default TestPage;
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import QuestionCard from "../components/QuestionCard";
import "./TestPage.css";

const TestPage = () => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const [timeLeft, setTimeLeft] = useState(3600); // 1 hour
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const questionsPerPage = 5;
  const totalQuestions = 60;
  const navigate = useNavigate();

  // ✅ Load saved answers, timer, questions
  useEffect(() => {
    const savedAnswers = localStorage.getItem("answers");
    const savedTime = localStorage.getItem("timeLeft");
    const savedQuestions = localStorage.getItem("questions");

    if (savedAnswers) {
      setAnswers(JSON.parse(savedAnswers));
      console.log("✅ Loaded saved answers");
    }

    if (savedTime) {
      setTimeLeft(parseInt(savedTime, 10));
      console.log("✅ Loaded saved timer");
    }

    if (savedQuestions) {
      setQuestions(JSON.parse(savedQuestions));
      console.log("✅ Loaded saved questions");
    } else {
      fetchQuestions();
    }
  }, []);

  // ✅ Save timer to localStorage every second
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          localStorage.removeItem("timeLeft");
          submitTest();
          return 0;
        }
        const updatedTime = prev - 1;
        localStorage.setItem("timeLeft", updatedTime);
        return updatedTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // ✅ Save answers
  useEffect(() => {
    localStorage.setItem("answers", JSON.stringify(answers));
  }, [answers]);

  const fetchQuestions = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/questions");
      const questionsData = await res.json();

      const allQuestions = [
        ...questionsData.Science,
        ...questionsData.Commerce,
        ...questionsData.Arts,
        ...questionsData.Compatibility,
      ];

      const shuffled = allQuestions.sort(() => 0.5 - Math.random()).slice(0, totalQuestions);
      setQuestions(shuffled);
      localStorage.setItem("questions", JSON.stringify(shuffled));
      console.log("✅ Fetched and saved questions");
    } catch (err) {
      console.error("❌ Failed to fetch questions:", err.message || err);
      alert("Could not load questions. Please try again.");
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  const handleOptionSelect = (questionIndex, option) => {
    const updatedAnswers = { ...answers, [questionIndex]: option };
    setAnswers(updatedAnswers);
  };

  const handleSubmit = () => {
    if (Object.keys(answers).length === totalQuestions) {
      submitTest();
    } else {
      setShowConfirmModal(true);
    }
  };

  const submitTest = async () => {
    try {
      if (!questions.length) {
        alert("❌ Questions not loaded yet.");
        return;
      }

      const responses = questions.map((q, index) => ({
        question: q.question,
        selected: answers[index] || null,
      }));

      const response = await fetch("http://localhost:5000/api/responses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ responses }),
      });

      if (!response.ok) throw new Error("Submission failed");

      const result = await response.json();

      // Clear all local storage
      localStorage.removeItem("questions");
      localStorage.removeItem("answers");
      localStorage.removeItem("timeLeft");

      navigate("/testreport", { state: result });
    } catch (error) {
      console.error("❌ Submission failed:", error);
      alert("❌ Submission failed. Please try again later.");
    }
  };

  const totalPages = Math.ceil(questions.length / questionsPerPage);
  const currentQuestions = questions.slice(
    currentPage * questionsPerPage,
    (currentPage + 1) * questionsPerPage
  );

  return (
    <div className="testpage-container force-light-mode">
      <aside className="sidebar">
        <div className="timer">⏰ {formatTime(timeLeft)}</div>
        <h2>Questions</h2>
        <div className="question-nav">
          {questions.map((_, i) => (
            <button
              key={i}
              className={`question-num ${answers[i] ? "answered" : ""}`}
              onClick={() => setCurrentPage(Math.floor(i / questionsPerPage))}
            >
              {i + 1}
            </button>
          ))}
        </div>

        <button onClick={handleSubmit} className="submit-btn">
          Submit Test
        </button>
      </aside>

      <main className="main-area">
        <h1>Test Questions</h1>
        <div className="question-list">
          {currentQuestions.map((q, i) => {
            const index = i + currentPage * questionsPerPage;
            return (
              <QuestionCard
                key={index}
                questionData={q}
                questionIndex={index}
                selectedOption={answers[index]}
                handleOptionSelect={handleOptionSelect}
              />
            );
          })}
        </div>

        <div className="pagination">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 0))}
            disabled={currentPage === 0}
          >
            Previous
          </button>
          {currentPage === totalPages - 1 ? (
            <button onClick={handleSubmit} className="submit-btn-inline">
              Submit
            </button>
          ) : (
            <button
              className="next-btn"
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages - 1))}
            >
              Next
            </button>
          )}
        </div>
      </main>

      {showConfirmModal && (
        <div className="custom-alert-overlay">
          <div className="custom-alert-box">
            <h2>⚠️ Incomplete Test</h2>
            <p>
              You haven’t answered all 60 questions. Submitting now may lead to inaccurate results.
            </p>
            <div className="alert-buttons">
              <button onClick={() => setShowConfirmModal(false)}>Go Back to Test</button>
              <button
                onClick={() => {
                  setShowConfirmModal(false);
                  submitTest();
                }}
              >
                End Test Anyway
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestPage;
