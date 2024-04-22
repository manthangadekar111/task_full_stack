
import React from 'react';
import './ModalforLogout.css';

const ModalforLogout = ({ isVisible, onClose, onConfirm }) => {
  if (!isVisible) {
    return null;
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}> 
      <h2>LogOut</h2>
        <h3>Are you sure you want to log out?</h3>
        <button onClose={onClose} className='cancelbtn'>cancel</button>
        <button onClick={onConfirm}  className='confirm'>confirm</button>
      </div>
    </div>
  );
};

export default ModalforLogout;
