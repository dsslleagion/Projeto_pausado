import React, { useState } from 'react';
import './input.css'; // Importando o arquivo de estilos CSS

const Input = ({ label, type, value, onChange }) => {
  return (
    <div className="input-container">
      <label className="input-label">{label}</label>
      <input
        type={type}
        className="input-field"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
