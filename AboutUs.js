import React from 'react';
import './AboutUs.css';

const AboutUs = () => {
  return (
    <div className="about-us-container">
      <h1>About Us</h1>
      <div className="about-us-content">
        <p>
          Welcome to <strong>Bookworm Book Shelf</strong> – your ultimate destination for discovering your next favorite book. 
          We believe that reading is not just a hobby, but a way of life that inspires, educates, and empowers individuals to explore new worlds.
        </p>
        <p>
          Our mission is to provide a wide selection of books for every reader – from timeless classics to the latest bestsellers. 
          We curate our collection to ensure quality, variety, and the joy of reading for every kind of book lover.
        </p>
        <p>
          Whether you're looking to lose yourself in a fictional world, learn something new, or simply unwind with a light read, 
          we have something for you. At <strong>Bookworm Book Shelf</strong>, we are passionate about connecting readers to great stories.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
