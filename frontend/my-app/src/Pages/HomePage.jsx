import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollTo) {
      const el = document.getElementById(location.state.scrollTo);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location]);

  return (
    <>
      {/* Hero Section */}
      <section id="home" className="home-section">
        <div className="home-content">
          <h1>
            Welcome to <span className="highlight">Right Road</span>
          </h1>
          <p>
            Choosing the right career path after 10th can feel confusing — but we're here to help!
            <br /><br />
            <strong>Right Road</strong> is a free platform designed to guide students towards their ideal stream: <strong>Science</strong>, <strong>Commerce</strong>, or <strong>Arts</strong>.
            <br /><br />
            Take a short test, explore your strengths, and discover the best fit for your future.
          </p>

          <button className="btn primary" onClick={() => navigate('/form')}>
            Take the Test
          </button>
        </div>
      </section>

      {/* ✅ About Section */}
      <section id="about" className="section about-section">
        <div className="section-container">
          <h1>About Us</h1>
          <p>
            We're a group of passionate educators, career counselors, and techies who believe every student deserves clarity about their future.
          </p>
          <p>
            Our platform combines expert-designed questions and smart algorithms to recommend the most suitable career direction.
            But we don’t stop at just suggestions — we guide students through why a particular stream fits their strengths, interests, and personality.
          </p>
        </div>
      </section>

      {/* ✅ Contact Section */}
      <section id="contact" className="section contact-section">
        <div className="section-container">
          <h1>Contact Us</h1>
          <p>Have questions or feedback? We'd love to hear from you!</p>
          <div className="contact-details">
            <p>📧 <strong>Email:</strong> support@pathfinder.com</p>
            <p>📱 <strong>Phone:</strong> +91 98765 43210</p>
            <p>🏢 <strong>Address:</strong> 123 Future Lane, Career Nagar, Mumbai, India</p>
          </div>
        </div>
      </section>

      {/* ✅ Feedback Shortcut Section (No form here) */}
      <section id="feedback" className="section feedback-section">
        <div className="section-container">
          <h1>Feedback</h1>
          <p>
            Your feedback helps us improve! Click the button below to share your thoughts or read what other students have said about Right Road.
          </p>
          <button
            className="btn"
            onClick={() => navigate('/feedback')}
          >
            Go to Feedback Page
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© 2025 Right Road. All rights reserved. | Built with 💡 & passion for students' future.</p>
      </footer>
    </>
  );
};

export default HomePage;
