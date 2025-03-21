// src/components/BooksPage.js
import React, { useState } from 'react';
import BookCard from './BookCard';

const BooksPage = () => {
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [filter, setFilter] = useState({ genre: '', minPrice: 0, maxPrice: 1000 });

  const books = [
    { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', price: 10, genre: 'Fiction', image: '/images/gatsby.jpg' },
    { id: 2, title: 'Becoming', author: 'Michelle Obama', price: 20, genre: 'Non-Fiction', image: '/images/becoming.jpg' },
    { id: 3, title: 'Sapiens', author: 'Yuval Noah Harari', price: 15, genre: 'History', image: '/images/sapiens.jpg' },
    // Add more books here
  ];

  const handleAddToCart = (book) => {
    setCart([...cart, book]);
    setTotalPrice(totalPrice + book.price);
  };

  const filteredBooks = books.filter(book => 
    (filter.genre ? book.genre === filter.genre : true) &&
    book.price >= filter.minPrice && book.price <= filter.maxPrice
  );

  return (
    <div>
      <h1>Books Store</h1>

      {/* Filters */}
      <div>
        <label>
          Genre:
          <select onChange={(e) => setFilter({ ...filter, genre: e.target.value })}>
            <option value="">All</option>
            <option value="Fiction">Fiction</option>
            <option value="Non-Fiction">Non-Fiction</option>
            <option value="History">History</option>
          </select>
        </label>
        <label>
          Price Range:
          <input type="number" placeholder="Min" onChange={(e) => setFilter({ ...filter, minPrice: e.target.value })} />
          <input type="number" placeholder="Max" onChange={(e) => setFilter({ ...filter, maxPrice: e.target.value })} />
        </label>
      </div>

      {/* Books List */}
      <div className="books-grid">
        {filteredBooks.map(book => (
          <BookCard key={book.id} book={book} addToCart={handleAddToCart} />
        ))}
      </div>

      <h3>Total Price: ${totalPrice}</h3>
    </div>
  );
};

export default BooksPage;
