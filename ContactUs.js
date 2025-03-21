import React, { useState } from 'react';
import './ContactUs.css';  // Ensure you have the necessary styles

const ContactUs = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [showModal, setShowModal] = useState(false);  // State to control modal visibility

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowModal(true);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="contact-us-container">
      <div className="contact-card">
        <h2>Contact Us</h2>
        <p>We'd love to hear from you! Please fill out the form below and we'll get back to you soon.</p>

        <form onSubmit={handleSubmit} className="contact-form">
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label>Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Write your message here"
              required
            />
          </div>

          <button type="submit" className="send-message-btn">Send Message</button>
        </form>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Message Sent Successfully!</h3>
            <p>Thank you for reaching out. We'll get back to you soon!</p>
            <button onClick={() => setShowModal(false)} className="close-btn">Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactUs;
