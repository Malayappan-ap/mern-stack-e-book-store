import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-item">Home</Link>
      <Link to="/books" className="navbar-item">Book Store</Link>
      <Link to="/blog" className="navbar-item">Blog Posts</Link>
    </nav>
  );
};

export default Navbar;
