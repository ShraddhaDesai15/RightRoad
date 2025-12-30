import React from 'react';
import { useNavigate } from 'react-router-dom';
import './TestIns.css';
import Navbar from '../components/Navbar';
// import omrImg from './public/omr.jpg';
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
  <li>📝 This test contains <strong>60 questions</strong>.</li>
  <li>✅ You must answer <strong>all questions</strong> to submit.</li>
  <li>⏳ Time limit: <strong>1 hour</strong>.</li>
  <li>📄 <strong>5 questions</strong> per page – use Next/Previous to navigate.</li>
  <li>🚫 Once submitted, answers <strong>cannot be changed</strong>.</li>
  <li>🔢 Use the sidebar to jump to specific questions quickly.</li>
  <li>📶 Use a <strong>stable internet connection</strong> to avoid data loss.</li>
</ul>


        <div className="note">⚠️ Please make sure you are ready before starting.</div>
        <button className="start-btn" onClick={handleStart}>Start Test</button>
      </div>
    </div>
  );
};

export default TestIns;
