import React from 'react';
import { Link } from 'react-router-dom';
import './ForumItem.css'; // Importe o arquivo CSS

const ForumItem = ({ forum, onDelete }) => {
  return (
    <div className="forum-card">
      <p>{forum.conteudo}</p>
      <button onClick={() => onDelete(forum.id)}>Excluir</button>
      <button><Link to={`/CadastroForum/${forum.id}`}>Editar</Link></button>
    </div>
  );
};

export default ForumItem;
