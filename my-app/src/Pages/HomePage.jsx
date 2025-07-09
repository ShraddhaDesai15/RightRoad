import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faPhone,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";
import {
  faLinkedin,
  faInstagram,
  faXTwitter
} from "@fortawesome/free-brands-svg-icons";

const HomePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [darkMode, setDarkMode] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);

const faqs = [
  {
    question: "What is RightRoad?",
    answer: "RightRoad is a free platform that helps students identify the most suitable stream after 10th grade based on their knowledge and interests.",
  },
  {
    question: "How does the test work?",
    answer: "The test includes questions from Science, Commerce, Arts, and Compatibility. Based on your answers, Pathfinder recommends the best stream for you.",
  },
  {
    question: "Do I need to sign up or log in?",
    answer: "Yes. Sign-up or login is required to attempt the full test and to receive a complete report.",
  },
  {
    question: "Is the test free?",
    answer: "Yes, RightRoad is completely free to use for all students.",
  },
  {
    question: "How reliable are the results?",
    answer: "The results are based on your answers and compatibility with each stream. It's a helpful guide, not a final decision-maker.",
  },
  {
    question: "Can I retake the test?",
    answer: "Yes, you can retake the test if you feel your interests or understanding have changed.",
  },
  {
    question: "Who can take this test?",
    answer: "The test is primarily designed for students who have completed their 10th grade or are exploring stream options.",
  },
  {
    question: "Do I need to prepare before taking the test?",
    answer: "No special preparation is needed. Just answer the questions honestly based on your knowledge and preferences.",
  },
  {
    question: "How long does the test take?",
    answer: "On average, the test takes around 60 minutes ( 1 Hour ) to complete.",
  }
];


  const toggleFAQ = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

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

      {/* About Section */}
      <section id="about" className="section about-section">
        <div className="section-container about-content">
          <div className="about-text">
            <h1>About Us</h1>
            <p>
              We're a group of passionate educators, career counselors, and techies who believe every student deserves clarity about their future.
            </p>
            <p>
              Our platform combines expert-designed questions and smart algorithms to recommend the most suitable career direction.
              But we don’t stop at just suggestions — we guide students through why a particular stream fits their strengths, interests, and personality.
            </p>
          </div>
          <div className="about-image">
            <img
              src="https://st.depositphotos.com/1038076/4908/i/450/depositphotos_49080337-stock-photo-about-us.jpg"
              alt="About Us"
            />
          </div>
        </div>
      </section>

      {/* Feedback Shortcut Section */}
      <section id="feedback" className="section feedback-section">
        <div className="section-container">
          <h1>Feedback</h1>
          <p>
            Your feedback helps us improve! Click the button below to share your thoughts or read what other students have said about Right Road.
          </p>
          <button className="btn" onClick={() => navigate('/feedback')}>
            Go to Feedback Page
          </button>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="section faq-section">
        <div className="section-container">
          <h1>Frequently Asked Questions</h1>
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`faq-item ${activeIndex === index ? 'active' : ''}`}
              onClick={() => toggleFAQ(index)}
            >
              <div className="faq-question">
                <h3>{faq.question}</h3>
                <span className="faq-icon">{activeIndex === index ? '−' : '+'}</span>
              </div>
              {activeIndex === index && (
                <div className="faq-answer">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
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
