import React from 'react';
import './Modal.css';  // Make sure you have the necessary CSS

const Modal = ({ message, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{message}</h2>
        <button onClick={onClose} className="close-btn">Close</button>
      </div>
    </div>
  );
};

export default Modal;
