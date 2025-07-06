import './Navbar.css';
import { useNavigate, useLocation } from 'react-router-dom';
import logoVideo from '../assets/logo.mp4';

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = (e, id) => {
    e.preventDefault();
    if (location.pathname === '/') {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate('/', { state: { scrollTo: id } });
    }
  };

  return (
    <header className="navbar">
      <div className="logo-container">
        <video className="nav-logo" src={logoVideo} autoPlay loop muted playsInline />
      </div>

      <nav className="nav-links">
        <a href="#home" className="nav-link" onClick={(e) => handleNavClick(e, 'home')}>Home</a>
        <a href="#about" className="nav-link" onClick={(e) => handleNavClick(e, 'about')}>About Us</a>
        <a href="#contact" className="nav-link" onClick={(e) => handleNavClick(e, 'contact')}>Contact Us</a>
        <a href="#feedback" className="nav-link" onClick={(e) => handleNavClick(e, 'feedback')}>Feedback</a>
        <a className="nav-link test-button" onClick={() => navigate('/form')}>Take Test</a>
      </nav>
    </header>
  );
}

export default Navbar;
