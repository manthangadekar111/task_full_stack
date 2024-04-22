import React, { useState } from 'react';
import './LoginForm.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Modal from './Modal';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate(); 

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      email,
      password,
    };

    try {
      const response = await fetch('http://localhost:3000/admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log('Admin added successfully');
        navigate('/admindashboard');

      } else {
        console.error('Failed to add admin:', response.statusText);
      }
    } catch (error) {
      console.error('An error occurred while sending the request:', error);
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleRequestReset = async (email) => {
    try {
      const response = await fetch('http://localhost:3000/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        console.log("Password reset link sent.");
      } else {
        console.error("Error sending password reset link:", response.statusText);
      }
    } catch (error) {
      console.error("Error sending password reset link:", error);
    }
  };
  return (
    <div className="login-container">
      <div className="login-form">
        <div className="logo">
          <img src="../src/Images/digitalflake_logo.png" alt="Digital Flake" />
        </div>
        <h2>Welcome to Digital Lake Admin</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
     
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-group">
            
            <div className="password-wrapper">
              <input
                type={isPasswordVisible ? 'text' : 'password'}
                id="password"
                value={password}
                name='password'
                onChange={handlePasswordChange}
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                className="toggle-password-visibility"
                onClick={togglePasswordVisibility}
              >
                <FontAwesomeIcon icon={isPasswordVisible ? faEye : faEyeSlash} />
              </button>
            </div>
          </div>
          <p className="forgot-password" onClick={openModal}>
            Forgot Password?
          </p>
          <button type="submit" className="login-button">
            Log In
          </button>
        </form>
      </div>

 
      <Modal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
        email={email}
        handleEmailChange={handleEmailChange}
        onRequestReset={handleRequestReset} 
      />
    </div>
  );
};

export default LoginForm;
