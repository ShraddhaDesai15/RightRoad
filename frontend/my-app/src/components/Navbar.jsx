import './Navbar.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import logoVideo from '/public/images/logo.mp4';

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [isDarkMode, setIsDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.body.classList.add('dark-mode');
      setIsDarkMode(true);
    }
  }, []);

  const toggleTheme = () => {
    const body = document.body;
    if (isDarkMode) {
      body.classList.remove('dark-mode');
      localStorage.setItem('theme', 'light');
    } else {
      body.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark');
    }
    setIsDarkMode(!isDarkMode);
  };

  const handleNavClick = (e, id) => {
    e.preventDefault();
    setMenuOpen(false);
    if (location.pathname === '/') {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/', { state: { scrollTo: id } });
    }
  };

  return (
    <header className="navbar">
      <div className="logo-title">
        <video
          className="nav-logo"
          src={logoVideo}
          autoPlay
          loop
          muted
          playsInline
          controls={false}
          disablePictureInPicture
          controlsList="nodownload nofullscreen noremoteplayback"
          onContextMenu={(e) => e.preventDefault()}
          style={{ pointerEvents: 'none' }}
        />
        <h1 className="site-title">Right Road</h1>
      </div>

      <div className="right-controls">
        <button className="theme-toggle-button" onClick={toggleTheme}>
          {isDarkMode ? '☀️' : '🌙'}
        </button>
        <button
          className="hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Menu"
        >
          {menuOpen ? '✖' : '☰'}
        </button>
      </div>

      <nav className={`nav-links ${menuOpen ? 'open' : ''}`}>
        <a href="#home" className="nav-link" onClick={(e) => handleNavClick(e, 'home')}>Home</a>
        <a href="#about" className="nav-link" onClick={(e) => handleNavClick(e, 'about')}>About Us</a>
        <a href="#feedback" className="nav-link" onClick={(e) => handleNavClick(e, 'feedback')}>Feedback</a>
        <a href="#faq" className="nav-link" onClick={(e) => handleNavClick(e, 'faq')}>FAQs</a>
        <a className="nav-link test-button" onClick={() => { setMenuOpen(false); navigate('/form'); }}>Take Test</a>
      </nav>
    </header>
  );
}

export default Navbar;
