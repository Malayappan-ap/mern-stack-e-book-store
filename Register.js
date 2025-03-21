import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook for redirection
import './Register.css';

const Register = () => {
  // State variables for each form field
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  
  // Initialize useNavigate hook
  const navigate = useNavigate();

  const handleRegister = async (event) => {
    event.preventDefault();
  
    const formData = {
      name: name,
      email: email,
      phone: phone,
      password: password,
    };
  
    console.log('Form data to send:', formData);  // Debugging line
  
    try {
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
      if (response.ok) {
        console.log('Registration successful:', data);
        // Redirect to login page after successful registration
        navigate('/login'); // This will navigate to the login page
      } else {
        setErrorMessage(data.message);
        console.error('Error:', data.message);
      }
    } catch (error) {
      setErrorMessage('Server Error: Please try again later.');
      console.error('Server Error:', error);
    }
  };
  

  return (
    <div className="register-container">
      <div className="register-card">
        <h2>Register</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Show error message */}

        <form onSubmit={handleRegister}>
          <div className="input-field">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="input-field">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-field">
            <label htmlFor="phone">Phone</label>
            <input
              type="tel"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>

          <div className="input-field">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="submit-button">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
