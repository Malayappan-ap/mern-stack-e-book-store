import React, { useState } from 'react';
import './Login.css'; // Ensure you have appropriate styles for the login page

const Login = () => {
  // State variables for login form fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // handleSubmit function for login
  const handleLogin = async (event) => {
    event.preventDefault(); // Prevent page reload on form submit

    const formData = {
      email: email,
      password: password,
    };

    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Login successful:', data);
        // You can redirect to a different page or store the token
        // For example, you can store the token in localStorage:
        localStorage.setItem('token', data.token);
        // Redirect to homepage or dashboard
        window.location.href = '/dashboard'; // You can use react-router for more dynamic navigation
      } else {
        setErrorMessage(data.message); // Show error message returned from backend
        console.error('Error:', data.message);
      }
    } catch (error) {
      setErrorMessage('Server Error: Please try again later.');
      console.error('Server Error:', error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Login</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Display error message */}

        <form onSubmit={handleLogin}>
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
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="submit-button">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
