import React from "react";
import "./QuestionCard.css";

const QuestionCard = ({
  questionData,
  questionIndex,
  selectedOption,
  handleOptionSelect,
}) => {
  return (
    <div className="question-card">
      <div className="question-title">
        {questionIndex + 1}. {questionData.question}
      </div>
      <div className="options-container">
        {questionData.options.map((optObj, idx) => {
          // Support both string and object-based options
          const optionText =
            typeof optObj === "string" ? optObj : optObj.option;

          return (
            <button
              key={idx}
              className={`option-button ${
                selectedOption === optionText ? "selected" : ""
              }`}
              onClick={() => handleOptionSelect(questionIndex, optionText)}
            >
              {optionText}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuestionCard;
