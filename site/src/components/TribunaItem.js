import React from 'react';
import { Link } from 'react-router-dom';
import './TribunaItem.css';

const TribunaItem = ({ tribuna, onDelete }) => {
  return (
   
    <div  className="card">
      <h2>{tribuna.nome}</h2>
      <p>{tribuna.descricao}</p>
      <button onClick={() => onDelete(tribuna.id)}>Excluir</button>
      <button ><Link to={`/cadastroTri/${tribuna.id}`}>Editar</Link></button>
    </div>
   
  );
};

export default TribunaItem;
