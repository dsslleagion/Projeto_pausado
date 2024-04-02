import React from 'react';
import { FaShare } from 'react-icons/fa';
import './NewsCard.css';


const NewsCard = ({ id, title, content, date, imagem }) => {

  imagem = "https://picsum.photos/id/237/720/300";
  const shareNews = () => {
    const newsUrl = `http://localhost:3000/NoticiaPage/${id}`;
    navigator.clipboard.writeText(newsUrl);
    alert('Link da notícia copiado para a área de transferência!');
  };

  return (
    <div className="news-card">
      <div className="news-card-header">
      <img src={imagem} alt="Imagem da Notícia" />
      </div>
      <div className="news-card-body">
      <h2>{title}</h2>
      <p>{content}</p>
      </div>
      <div className="news-card-footer">
      <span>{date}</span>
      <div className="share-button" onClick={shareNews}>
        <FaShare />
        </div>
      </div>
      
    </div>
  );
};

export default NewsCard;
