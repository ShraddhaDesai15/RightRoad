import React from 'react';
import './FeedbackCard.css';

const FeedbackCard = ({ feedback }) => {
  return (
    <div className="feedback-card">
      <h3>{feedback.name || 'Anonymous'}</h3>
      <p>{feedback.message}</p>
      <div className="feedback-meta">
        {feedback.rating && (
          <span className="feedback-rating">⭐ {feedback.rating}/5</span>
        )}
        {feedback.createdAt && (
          <span className="feedback-date">
            {new Date(feedback.createdAt).toLocaleDateString()}
          </span>
        )}
      </div>
    </div>
  );
};

export default FeedbackCard;
