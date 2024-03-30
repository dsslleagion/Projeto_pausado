import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';

const TribunaItem2 = ({ tribuna }) => {
  return (
    <div key={tribuna.id}>
      <h2>{tribuna.nome}</h2>
      <p>{tribuna.descricao}</p>
      <Link to={tribuna.linkGrupoWhatsapp}>
        <FontAwesomeIcon icon={faWhatsapp} size="lg" />
      </Link>
    </div>
  );
};

export default TribunaItem2;
