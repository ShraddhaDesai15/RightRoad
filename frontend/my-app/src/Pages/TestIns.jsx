import React from 'react';
import { useNavigate } from 'react-router-dom';
import './TestIns.css';
import Navbar from '../components/Navbar';

const TestIns = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/test');
  };

  return (
    <div className="testins-container">
      <div className="testins-box">
        <h1 className="testins-title">📘 Test Instructions</h1>
        <ul className="testins-list">
          <li>This test consists of 60 questions.</li>
          <li>All questions must be answered to submit the test.</li>
          <li>There is a time limit of <strong>1 hour</strong>.</li>
          <li>Each page shows 5 questions. Use Next/Previous to navigate.</li>
          <li>Once submitted, your responses cannot be changed.</li>
          <li>Click the question numbers in the sidebar to jump directly.</li>
        </ul>
        <div className="note">⚠️ Please make sure you are ready before starting.</div>
        <button className="start-btn" onClick={handleStart}>Start Test</button>
      </div>
    </div>
  );
};

export default TestIns;
