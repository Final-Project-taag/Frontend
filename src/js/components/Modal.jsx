
import React from 'react';

function Modal({ show, onClose, children }) {
  if (!show) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg py-4 px-6">
        <button
          className="absolute top-0 right-0 mt-4 mr-4"
          onClick={onClose}
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
}

export default Modal;
