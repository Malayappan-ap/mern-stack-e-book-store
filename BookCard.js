// BookCard.js
import React from 'react';

const BookCard = ({ book, onAddToCart }) => {
  return (
    <div className="book-card">
      <img src={book.image} alt={book.title} />
      <h3>{book.title}</h3>
      <p>{book.description}</p>
      <span>Price: ${book.price}</span>
      <button onClick={() => onAddToCart(book)}>Add to Cart</button>
      <Link to="/payment">
        <button>Buy Now</button>
      </Link>
    </div>
  );
};

export default BookCard;
