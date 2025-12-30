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
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import QuestionCard from "../components/QuestionCard";
// import "./TestPage.css";

// const QUESTIONS_PER_PAGE = 5;
// const TOTAL_QUESTIONS = 60;
// const TEST_DURATION = 3600;

// const TestPage = () => {
//   const navigate = useNavigate();
//   const [questions, setQuestions] = useState([]);
//   const [answers, setAnswers] = useState(() => JSON.parse(localStorage.getItem("answers")) || {});
//   const [currentPage, setCurrentPage] = useState(() => parseInt(localStorage.getItem("currentPage")) || 0);
//   const [timeLeft, setTimeLeft] = useState(() => parseInt(localStorage.getItem("timeLeft")) || TEST_DURATION);
//   const [showConfirmModal, setShowConfirmModal] = useState(false);
//   const [showErrorModal, setShowErrorModal] = useState(false);

//   const formatTime = (seconds) => {
//     const mins = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
//   };
//   const fetchQuestions = async () => {
//     try {
//       const res = await fetch("http://localhost:5000/api/questions");
//       const data = await res.json();
//       const all = [...data.Science, ...data.Commerce, ...data.Arts, ...data.Compatibility];
//       const shuffled = all.sort(() => 0.5 - Math.random()).slice(0, TOTAL_QUESTIONS);
//       setQuestions(shuffled);
//       localStorage.setItem("questions", JSON.stringify(shuffled));
//     } catch (err) {
//       console.error("❌ Failed to fetch questions:", err.message || err);
//       alert("Could not load questions. Please try again.");
//     }
//   };

//   useEffect(() => {
//     const saved = localStorage.getItem("questions");
//     if (saved) {
//       setQuestions(JSON.parse(saved));
//     } else {
//       fetchQuestions();
//     }
//   }, []);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setTimeLeft((prev) => {
//         if (prev <= 1) {
//           clearInterval(timer);
//           localStorage.removeItem("timeLeft");
//           submitTest();
//           return 0;
//         }
//         const updated = prev - 1;
//         localStorage.setItem("timeLeft", updated);
//         return updated;
//       });
//     }, 1000);
//     return () => clearInterval(timer);
//   }, []);

//   useEffect(() => {
//     window.scrollTo(0, 0);
//     localStorage.setItem("answers", JSON.stringify(answers));
//     localStorage.setItem("currentPage", currentPage);
//   }, [answers, currentPage]);

//   const handleOptionSelect = (questionIndex, selectedOptionObj) => {
//     setAnswers((prev) => ({ ...prev, [questionIndex]: selectedOptionObj }));
//   };

//   const submitTest = async () => {
//     const attemptedCount = Object.keys(answers).length;
//     if (attemptedCount === 0) {
//       setShowErrorModal(true);
//       return;
//     }

//     try {
//       const responses = questions.map((q, index) => ({
//         question: q.question,
//         selected: answers[index] || null,
//       }));

//       const res = await fetch("http://localhost:5000/api/responses", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ responses }),
//       });

//       if (!res.ok) throw new Error("Submission failed");

//       const result = await res.json();
//       localStorage.clear();
//       navigate("/testreport", { state: result });
//     } catch (error) {
//       console.error("❌ Submission error:", error);
//       alert("Submission failed. Please try again later.");
//     }
//   };

//   const handleSubmit = () => {
//     const answeredCount = Object.keys(answers).length;
//     if (answeredCount === 0) {
//       setShowErrorModal(true);
//     } else if (answeredCount === TOTAL_QUESTIONS) {
//       submitTest();
//     } else {
//       setShowConfirmModal(true);
//     }
//   };

//   const totalPages = Math.ceil(questions.length / QUESTIONS_PER_PAGE);
//   const currentQuestions = questions.slice(
//     currentPage * QUESTIONS_PER_PAGE,
//     (currentPage + 1) * QUESTIONS_PER_PAGE
//   );

//   return (
//     <div className="testpage-container force-light-mode">
//       <aside className="sidebar">
//         <div className="timer">⏰ {formatTime(timeLeft)}</div>
//         <h2>Questions</h2>
//         <div className="question-grid">
//           {questions.map((_, i) => (
//             <button
//               key={i}
//               className={`question-num ${answers[i] ? "answered" : ""}`}
//               onClick={() => setCurrentPage(Math.floor(i / QUESTIONS_PER_PAGE))}
//             >
//               {i + 1}
//             </button>
//           ))}
//         </div>
//         <div style={{ marginTop: "20px" }}></div>
//         {/* <button className="submit-btn" onClick={handleSubmit}>
//           Submit Test
//         </button> */}
//       </aside>
//  <button
//           className="hamburger"
//           onClick={() => setMenuOpen(!menuOpen)}
//           aria-label="Toggle Menu"
//         >
//           {menuOpen ? '✖' : '☰'}
//         </button>
      
//       <main className="main-area">
//         <div className="question-list">
//           {currentQuestions.map((q, i) => {
//             const index = i + currentPage * QUESTIONS_PER_PAGE;
//             return (
//               <QuestionCard
//                 key={index}
//                 questionData={q}
//                 questionIndex={index}
//                 selectedOption={answers[index]}
//                 handleOptionSelect={(id, option) => handleOptionSelect(index, option)}
//               />
//             );
//           })}
//         </div>

//         <div className="pagination">
//           <button
//             className="submit-btn-inline"
//             onClick={() => setCurrentPage((p) => Math.max(p - 1, 0))}
//             disabled={currentPage === 0}
//           >
//             Previous
//           </button>

//           {currentPage === totalPages - 1 ? (
//             <button className="submit-btn-inline" onClick={handleSubmit}>
//               Submit
//             </button>
//           ) : (
//             <button
//               className="submit-btn-inline"
//               onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages - 1))}
//               disabled={currentPage === totalPages - 1}
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
//             <p>You haven’t answered all questions. Submit anyway?</p>
       
//               <button  className="alert-buttons "onClick={() => setShowConfirmModal(false)}>Go Back</button>
//               <button className="alert-buttons"
//                 onClick={() => {
//                   setShowConfirmModal(false);
//                   submitTest();
//                 }}
//               >
//                 Submit Anyway</button>
//             </div>
//           </div>
   
//       )}

//       {showErrorModal && (
//         <div className="custom-alert-overlay">
//           <div className="custom-alert-box">
//             <h2>❌ Cannot Submit</h2>
//             <p>Error resolving the test. You haven’t answered any question.</p>
//             <div className="alert-buttons">
//               <button onClick={() => setShowErrorModal(false)}>OK</button>
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

const QUESTIONS_PER_PAGE = 5;
const TOTAL_QUESTIONS = 60;
const TEST_DURATION = 3600;

const TestPage = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState(() => JSON.parse(localStorage.getItem("answers")) || {});
  const [currentPage, setCurrentPage] = useState(() => parseInt(localStorage.getItem("currentPage")) || 0);
  const [timeLeft, setTimeLeft] = useState(() => parseInt(localStorage.getItem("timeLeft")) || TEST_DURATION);
  const [menuOpen, setMenuOpen] = useState(false); // ✅ Added missing menuOpen
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  const fetchQuestions = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/questions");
      const data = await res.json();
      const all = [...data.Science, ...data.Commerce, ...data.Arts, ...data.Compatibility];
      const shuffled = all.sort(() => 0.5 - Math.random()).slice(0, TOTAL_QUESTIONS);
      setQuestions(shuffled);
      localStorage.setItem("questions", JSON.stringify(shuffled));
    } catch (err) {
      console.error("❌ Failed to fetch questions:", err.message || err);
      setShowErrorModal(true);
    }
  };

  useEffect(() => {
    const saved = localStorage.getItem("questions");
    if (saved) setQuestions(JSON.parse(saved));
    else fetchQuestions();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          localStorage.removeItem("timeLeft");
          submitTest();
          return 0;
        }
        const updated = prev - 1;
        localStorage.setItem("timeLeft", updated);
        return updated;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    localStorage.setItem("answers", JSON.stringify(answers));
    localStorage.setItem("currentPage", currentPage);
  }, [answers, currentPage]);

  const handleOptionSelect = (questionIndex, selectedOptionObj) => {
    setAnswers((prev) => ({ ...prev, [questionIndex]: selectedOptionObj }));
  };

  const submitTest = async () => {
    if (Object.keys(answers).length === 0) {
      setShowErrorModal(true);
      return;
    }

    try {
      const responses = questions.map((q, index) => ({
        question: q.question,
        selected: answers[index] || null,
      }));

      const res = await fetch("http://localhost:5000/api/responses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ responses }),
      });

      if (!res.ok) throw new Error("Submission failed");

      const result = await res.json();
      localStorage.clear();
      navigate("/testreport", { state: result });
    } catch (error) {
      console.error("❌ Submission error:", error);
      alert("Submission failed. Please try again later.");
    }
  };

  const handleSubmit = () => {
    const answeredCount = Object.keys(answers).length;
    if (answeredCount === 0) setShowErrorModal(true);
    else if (answeredCount === TOTAL_QUESTIONS) submitTest();
    else setShowConfirmModal(true);
  };

  const totalPages = Math.ceil(questions.length / QUESTIONS_PER_PAGE);
  const currentQuestions = questions.slice(
    currentPage * QUESTIONS_PER_PAGE,
    (currentPage + 1) * QUESTIONS_PER_PAGE
  );

  return (
    <div className="testpage-container force-light-mode">
      <aside className={`sidebar ${menuOpen ? "open" : ""}`}>
        <div className="timer">⏰ {formatTime(timeLeft)}</div>
        <h2>Questions</h2>

        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? "✖" : "☰"}
        </button>

        {menuOpen && (
          <div className="question-grid">
            {questions.map((_, i) => (
              <button
                key={i}
                className={`question-num ${answers[i] ? "answered" : ""}`}
                onClick={() => setCurrentPage(Math.floor(i / QUESTIONS_PER_PAGE))}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}

        {/* <button className="submit-btn" onClick={handleSubmit}>
          Submit Test
        </button> */}
      </aside>

      <main className="main-area">
        {currentQuestions.length > 0 ? (
          <div className="question-list">
            {currentQuestions.map((q, i) => {
              const index = i + currentPage * QUESTIONS_PER_PAGE;
              return (
                <QuestionCard
                  key={index}
                  questionData={q}
                  questionIndex={index}
                  selectedOption={answers[index]}
                  handleOptionSelect={(id, option) => handleOptionSelect(index, option)}
                />
              );
            })}
          </div>
        ) : (
          <p>Loading questions...</p>
        )}

        <div className="pagination">
          <button onClick={() => setCurrentPage((p) => Math.max(p - 1, 0))} disabled={currentPage === 0}>
            Previous
          </button>

          {currentPage === totalPages - 1 ? (
            <button onClick={handleSubmit}>Submit</button>
          ) : (
            <button onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages - 1))}>Next</button>
          )}
        </div>
      </main>

      {showConfirmModal && (
        <div className="custom-alert-overlay">
          <div className="custom-alert-box">
            <h2>⚠️ Incomplete Test</h2>
            <p>You haven’t answered all questions. Submit anyway?</p>
            <button onClick={() => setShowConfirmModal(false)}>Go Back</button>
            <button onClick={() => { setShowConfirmModal(false); submitTest(); }}>
              Submit Anyway
            </button>
          </div>
        </div>
      )}

      {showErrorModal && (
        <div className="custom-alert-overlay">
          <div className="custom-alert-box">
            <h2>❌ Cannot Submit</h2>
            <p>You haven’t answered any question.</p>
            <button onClick={() => setShowErrorModal(false)}>OK</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestPage;
