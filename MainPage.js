import React from 'react';
import { useNavigate } from 'react-router-dom';
import './MainPage.css';  // Ensure you have the necessary styles

const MainPage = () => {
  const navigate = useNavigate();

  const handleRegister = () => {
    navigate('/register');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <div className="main-page-container">
      <div className="hero-section">
        <div className="hero-content">
          <div className="hero-card"> {/* Transparent Card */}
            <h1 className="main-title">Bookworm Book Shelf</h1>  {/* Title */}
            <h2>Discover Your Next Favorite Book</h2>
            <p>Browse a wide selection of books and indulge in your reading journey.</p>
            <div className="hero-buttons">
              <button onClick={handleRegister} className="main-button">New Here? Register</button>
              <button onClick={handleLogin} className="main-button">Login</button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer Section */}
      <div className="footer">
        <div className="footer-content">
          <p>
            <a href="/about">About Us</a> | <a href="/contact">Contact Us</a> | 
            <a href="/terms">Terms & Conditions</a> | <a href="/privacy">Privacy Policy</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
