// NewsCard.js
import React from 'react';


const NewsCard = ({ title, content, date }) => {
  return (
    <div className="news-card">
      <img src="https://via.placeholder.com/335x100" alt="Imagem Fictícia" />  {/* Adiciona a imagem fictícia */}
      <h2>{title}</h2>
      <p>{content}</p>
      <span>{date}</span>
    </div>
  );
};

export default NewsCard;
