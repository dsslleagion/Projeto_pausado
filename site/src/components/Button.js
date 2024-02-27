// Button.js
import React from 'react';
import './button.css';

const Button = ({ text, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
    >
      {text}
    </button>
  );
};

export default Button;
