// NewsCard.js
import React from 'react';


const CandidatoCard = ({nome, content}) => {
  return (
    <div className="news-card">
      <h2>{nome}</h2>
      <p>{content}</p>

    </div>
  );
};

export default CandidatoCard;
