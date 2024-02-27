import React, { useState } from 'react';
import './NewsCard.css';

const NewsCard = ({ title, content, date }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <div className={`news-card bg-gray-200 rounded shadow p-4 mb-4 ${expanded ? 'expanded' : ''}`} onClick={toggleExpand}>
      <h3 className="news-title text-xl font-bold mb-2">{title}</h3>
      <div className="news-image mb-2"></div> {/* Imagem fictícia */}
      <p className="news-content text-gray-800">{content}</p>
      <p className="news-date text-gray-500">{date}</p>
    </div>
  );
};

export default NewsCard;
