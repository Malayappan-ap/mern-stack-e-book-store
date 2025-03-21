import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  const [books, setBooks] = useState([]);
  const [cart, setCart] = useState([]);
  const [filter, setFilter] = useState('');
  const [selectedFormat, setSelectedFormat] = useState('paperback'); // Default format
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/books');
        const data = await response.json();
        setBooks(data);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };
    fetchBooks();
  }, []);

  const handleAddToCart = (book) => {
    const bookWithFormat = { ...book, format: selectedFormat };
    setCart((prevCart) => [...prevCart, bookWithFormat]);
  };

  const handleFilterChange = (genre) => {
    setFilter(genre);
  };

  const filteredBooks = filter ? books.filter(book => book.genre === filter) : books;

  // Function to handle Buy Now button click
  const handleBuyNow = (book) => {
    const bookWithFormat = { ...book, format: selectedFormat };
    navigate('/payment', { state: { cart: [bookWithFormat] } });
  };

  return (
    <div className="homepage-container">
      <header className="homepage-header">
        <h1>📚 Welcome to the Bookstore</h1>
        <div className="header-controls">
          <select onChange={(e) => handleFilterChange(e.target.value)} value={filter} className="filter-dropdown">
            <option value="">All Genres</option>
            <option value="Fiction">Fiction</option>
            <option value="Non-Fiction">Non-Fiction</option>
            <option value="History">History</option>
            <option value="Fantasy">Fantasy</option>
            <option value="Self-Help">Self-Help</option>
            <option value="Memoir">Memoir</option>
          </select>

          <div className="cart-info">
            <span>🛒 Cart: {cart.length} items</span>
            <button className="view-cart-btn" onClick={() => navigate('/cart', { state: { cart } })}>
              Go to Cart
            </button>
          </div>
        </div>
      </header>

      <div className="book-cards-container">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <div key={book._id} className="book-card">
              <img src={book.image} alt={book.title} className="book-image" />
              <h3>{book.title}</h3>
              <p>{book.description}</p>
              <p><strong>${book.price}</strong></p>
              
              {/* Format selection dropdown */}
              <select
                onChange={(e) => setSelectedFormat(e.target.value)}
                value={selectedFormat}
                className="format-dropdown"
              >
                <option value="paperback">Paperback</option>
                <option value="ebook">eBook</option>
              </select>

              <button className="add-to-cart-btn" onClick={() => handleAddToCart(book)}>Add to Cart</button>
              <button className="buy-now-btn" onClick={() => handleBuyNow(book)}>Buy Now</button>
            </div>
          ))
        ) : (
          <p className="no-books-message">No books available</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;
