// src/components/Home.js (or Dashboard.js)
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleBookStoreClick = () => {
    navigate('/homepage');
  };

  const handleArticlesClick = () => {
    navigate('/blog');
  };

  return (
    <div>
      <h1>Welcome to the Dashboard</h1>
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <div className="card" onClick={handleBookStoreClick} style={{ cursor: 'pointer' }}>
          <h3>Book Store</h3>
          <p>Explore books and make a purchase!</p>
        </div>
        <div className="card" onClick={handleArticlesClick} style={{ cursor: 'pointer' }}>
          <h3>Blog Articles</h3>
          <p>Read interesting articles about books and reading.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
