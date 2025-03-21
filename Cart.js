// Cart.js
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Cart.css';

const Cart = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const cart = location.state?.cart || []; // Retrieve cart from state, default to empty array if not found

  const handleProceedToPayment = () => {
    navigate('/payment', { state: { cart } }); // Pass cart to Payment page
  };

  return (
    <div className="cart-container">
      <h1>Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty. Please add items to the cart.</p>
      ) : (
        <>
          <div className="cart-items">
            {cart.map((book, index) => (
              <div key={index} className="cart-item">
                <img src={book.image} alt={book.title} />
                <div className="item-details">
                  <h3>{book.title}</h3>
                  <p>${book.price}</p>
                </div>
              </div>
            ))}
          </div>
          <button onClick={handleProceedToPayment} className="proceed-to-payment-btn">
            Proceed to Payment
          </button>
        </>
      )}
    </div>
  );
};

export default Cart;
