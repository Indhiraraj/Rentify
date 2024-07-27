import React from 'react';
import './Modal.css'; // You can add styles for the modal in this CSS file

const Modal = ({ show, onClose, children }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="modal-close" onClick={onClose}>X</button>
        <div className="modal-content">
        
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
