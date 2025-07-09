import React from 'react';
import './QuestionCard.css';

const QuestionCard = ({ questionData, questionIndex, selectedOption, handleOptionSelect }) => {
  return ( <div className="force-light-mode">
    <div className="question-card">
      <h2 className="question-title">
        Q{questionIndex + 1}. {questionData.question}
      </h2>
      <div className="options-container">
        {questionData.options.map((optionObj, index) => {
          const optionText = typeof optionObj === 'string' ? optionObj : optionObj.option;

          return (
            <button
              key={index}
              onClick={() => handleOptionSelect(questionIndex, optionText)}
              className={`option-button ${selectedOption === optionText ? 'selected' : ''}`}
            >
              {optionText}
            </button>
          );
        })}
      </div> </div>
    </div>
  );
};

export default QuestionCard;
