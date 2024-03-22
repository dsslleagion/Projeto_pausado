// NewsCard.js
import React from 'react';


const NewsCard = ({ title, content, date }) => {
  return (
    <div className="news-card">
      
      <h2>{title}</h2>
      <p>{content}</p>
      <span>{date}</span>
    </div>
  );
};

export default NewsCard;
