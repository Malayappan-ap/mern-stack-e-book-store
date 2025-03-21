// Header.js
import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ cartItems, onFilterChange }) => {
  return (
    <header>
      <div className="header-container">
        <h1>Bookstore</h1>

        {/* Filters */}
        <div className="filters">
          <select onChange={e => onFilterChange(e.target.value)}>
            <option value="">Select Genre</option>
            <option value="Fiction">Fiction</option>
            <option value="Non-Fiction">Non-Fiction</option>
            <option value="History">History</option>
            <option value="Self-Help">Self-Help</option>
            {/* Add other genres as needed */}
          </select>
        </div>

        {/* Cart Icon */}
        <div className="cart">
          <Link to="/cart">
            <span>Cart ({cartItems.length})</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
