import React, { useState } from 'react';
import { useUser } from '../context/UserContext';

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const { login } = useUser();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim() && email.trim()) {
      login(username.trim(), email.trim());
    }
  };

  return (
    <div className="login-form-overlay">
      <div className="login-form-container">
        <h2>Welcome to the Forum</h2>
        <p>Please enter your details to continue</p>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="login-input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
            />
          </div>
          <div className="login-input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          <button type="submit" className="login-submit-btn">
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
