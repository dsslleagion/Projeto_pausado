// NewsCard.js
import React from 'react';


const NewsCard = ({ title, content, date , imagem}) => {
  return (
    <div className="news-card">
      <img>{imagem}</img>
      <h2>{title}</h2>
      <p>{content}</p>
      <span>{date}</span>
    </div>
  );
};

export default NewsCard;
