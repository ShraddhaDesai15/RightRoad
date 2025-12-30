import React, { useEffect, useState } from 'react';
import './Feedback.css'; 

const Feedback = () => {
  const [view, setView] = useState('form'); // 'form' | 'responses'
  const [feedbacks, setFeedbacks] = useState([]);
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
    rating: 5,
  });
  const [loading, setLoading] = useState(false);

  const loadFeedbacks = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/feedback');
      const data = await res.json();
      setFeedbacks(data);
    } catch (err) {
      console.error('❌ Failed to fetch feedback:', err);
    }
  };

  useEffect(() => {
    if (view === 'responses') {
      loadFeedbacks();
    }
  }, [view]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('http://localhost:5000/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error('Submission failed');

      setForm({ name: '', email: '', message: '', rating: 5 });
      alert('✅ Feedback submitted successfully!');
      setView('responses');
    } catch (err) {
      alert('❌ Could not submit feedback.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="feedback-page-container">
      <h1>📝 Feedback</h1>

      {/* ------------------ FORM VIEW ------------------ */}
      {view === 'form' && (
        <>
          <p>We'd love to hear from you!</p>
          <form className="feedback-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Your name"
              value={form.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your email"
              value={form.email}
              onChange={handleChange}
              required
            />
            <textarea
              name="message"
              placeholder="Your feedback..."
              value={form.message}
              onChange={handleChange}
              required
            ></textarea>
            <label>
              Rating:
              <select name="rating" value={form.rating} onChange={handleChange}>
                {[5, 4, 3, 2, 1].map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </label>
            <button type="submit" disabled={loading}>
              {loading ? 'Submitting...' : 'Submit Feedback'}
            </button>
          </form>

          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <button onClick={() => setView('responses')}>
              👀 See what other users say about us
            </button>
          </div>
        </>
      )}

      {/* ------------------ RESPONSES VIEW ------------------ */}
      {view === 'responses' && (
        <>
          <p>Here's what students say about Right Road:</p>
          <div className="feedback-list">
            {feedbacks.length > 0 ? (
              feedbacks.map((fb, index) => (
                <div key={index} className="feedback-card">
                  <h3>{fb.name || 'Anonymous'}</h3>
                  <p>{fb.message}</p>
                  <div className="feedback-meta">
                    {fb.rating && <span>⭐ {fb.rating}/5</span>}
                    {fb.createdAt && (
                      <span style={{ marginLeft: '10px', color: '#555' }}>
                        {new Date(fb.createdAt).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p>No feedback available yet.</p>
            )}
          </div>

          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <button onClick={() => setView('form')}>
              ✏️ Submit Your Feedback
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Feedback;
