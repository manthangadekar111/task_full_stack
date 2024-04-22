import React from 'react';
import './Modal.css';

const Modal = ({ isOpen, onClose, email, handleEmailChange, onRequestReset }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
        <h3 style={{ margin: '10px 102px' }}>Did you forget your password?</h3>
        <p>
          Enter your email address, and we'll send you a link to reset your password.
        </p>
        <label htmlFor="email">Email Address</label>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={handleEmailChange}
        />
        <button onClick={() => onRequestReset(email)} className='request-reset'>
          Request Reset Link
        </button>
        <p style={{ marginLeft: '200px' }}>
          <a href="#" onClick={onClose}>Back to Login</a>
        </p>
      </div>
    </div>
  );
};

export default Modal;
