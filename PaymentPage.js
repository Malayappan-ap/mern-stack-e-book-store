import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './PaymentPage.css';

const Payment = () => {
  const location = useLocation();
  const cart = location.state?.cart || []; // Default to an empty array if cart is not passed

  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(''); // State for payment method selection
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [upiId, setUpiId] = useState('');
  const [bank, setBank] = useState('');

  // Calculate the total price of the books in the cart
  const calculateTotal = () => {
    return cart.reduce((total, book) => total + book.price, 0).toFixed(2);
  };

  // Handle the payment process
  const handleCompletePayment = (e) => {
    e.preventDefault();

    // Validate that a payment method is selected and required details are filled
    if (!paymentMethod) {
      alert("Please select a payment method");
      return;
    }

    // Validate fields based on the selected payment method
    if (paymentMethod === 'card' && (!cardNumber || !expiryDate || !cvv)) {
      alert("Please fill in all card details");
      return;
    }

    if (paymentMethod === 'upi' && !upiId) {
      alert("Please enter your UPI ID");
      return;
    }

    if (paymentMethod === 'netBanking' && !bank) {
      alert("Please select a bank");
      return;
    }

    // If all validations pass, display success
    setPaymentSuccess(true);
    setShowModal(true);
  };

  return (
    <div className="payment-container">
      <h1>Complete Your Payment</h1>

      {paymentSuccess ? (
        <div className="success-message">
          <h2>Payment Successful!</h2>
          <p>Your order has been successfully processed. Thank you for your purchase!</p>
        </div>
      ) : (
        <>
          <div className="payment-summary">
            <h2>Order Summary</h2>
            <div className="order-items">
              {cart.map((book, index) => (
                <div key={index} className="order-item">
                  <img src={book.image} alt={book.title} />
                  <div className="item-details">
                    <h3>{book.title}</h3>
                    <p>${book.price}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="total">
              <h3>Total: ${calculateTotal()}</h3>
            </div>
          </div>

          <div className="payment-form">
            <h2>Select Payment Method</h2>
            {/* Payment Method Options */}
            <div className="payment-methods">
              <label>
                <input
                  type="radio"
                  value="card"
                  checked={paymentMethod === 'card'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                Debit/Credit Card
              </label>
              <label>
                <input
                  type="radio"
                  value="upi"
                  checked={paymentMethod === 'upi'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                UPI
              </label>
              <label>
                <input
                  type="radio"
                  value="netBanking"
                  checked={paymentMethod === 'netBanking'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                Net Banking
              </label>
            </div>

            <form onSubmit={handleCompletePayment}>
              {/* Conditional Fields Based on Payment Method */}
              {paymentMethod === 'card' && (
                <>
                  <div className="form-group">
                    <label>Card Number</label>
                    <input
                      type="password"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      placeholder="Enter card number"
                      required
                      minLength="16"
                      maxLength="16"
                    />
                  </div>
                  <div className="form-group">
                    <label>Expiry Date</label>
                    <input
                      type="text"
                      value={expiryDate}
                      onChange={(e) => setExpiryDate(e.target.value)}
                      placeholder="MM/YY"
                      required
                      pattern="(0[1-9]|1[0-2])\/([0-9]{2})"
                      title="Enter a valid expiry date (MM/YY)"
                    />
                  </div>
                  <div className="form-group">
                    <label>CVV</label>
                    <input
                      type="password"
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value)}
                      placeholder="Enter CVV"
                      required
                      minLength="3"
                      maxLength="3"
                    />
                  </div>
                </>
              )}

              {paymentMethod === 'upi' && (
                <div className="form-group">
                  <label>UPI ID</label>
                  <input
                    type="text"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    placeholder="Enter UPI ID (e.g., name@bank)"
                    required
                  />
                </div>
              )}

              {paymentMethod === 'netBanking' && (
                <div className="form-group">
                  <label>Bank</label>
                  <select value={bank} onChange={(e) => setBank(e.target.value)} required>
                    <option value="">Select Bank</option>
                    <option value="bankA">Bank A</option>
                    <option value="bankB">Bank B</option>
                    <option value="bankC">Bank C</option>
                  </select>
                </div>
              )}

              <button type="submit" className="complete-payment-btn">
                Complete Payment
              </button>
            </form>
          </div>
        </>
      )}

      {/* Success Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Payment Successful!</h3>
            <p>Your payment has been processed. Thank you for your purchase!</p>
            <button onClick={() => setShowModal(false)} className="close-btn">Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Payment;
