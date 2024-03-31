import React from 'react';
import { FaShare } from 'react-icons/fa';

const NewsCard = ({ id, title, content, date, imagem }) => {
  const shareNews = () => {
    const newsUrl = `http://localhost:3000/NoticiaPage/${id}`;
    navigator.clipboard.writeText(newsUrl);
    alert('Link da notícia copiado para a área de transferência!');
  };

  return (
    <div className="news-card">
      <img src={imagem} alt="Imagem da Notícia" />
      <h2>{title}</h2>
      <p>{content}</p>
      <span>{date}</span>
      <div className="share-button" onClick={shareNews}>
        <FaShare />
      </div>
    </div>
  );
};

export default NewsCard;
