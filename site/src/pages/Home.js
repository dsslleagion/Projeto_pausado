import React, { useState, useEffect } from 'react';
import NavigationBar from '../components/NavigationBar';
import NewsCard from '../components/NewsCard';
import './Home.css'; // Importe o arquivo CSS da Home
import Footer from '../components/Footer';

const Home = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  function getData() {
    fetch("http://localhost:3001/noticia/noticias", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      }
    })
    .then((response) => response.json())
    .then((data) => {
      const formattedData = data.map((item) => ({
        id: item.id,
        title: item.titulo,
        content: item.conteudo,
        date: new Date(item.dataPublicacao).toLocaleDateString(),
      }));
      setNews(formattedData);
    })
    .catch((error) => {
      console.error('Erro ao obter notícias:', error);
    });
  }

  return (
    <div>
      <NavigationBar />
      <div className="container mx-auto px-4 py-8 main-container">
        <h1 className="text-3xl font-bold mb-4">Feed de Notícias</h1>
        <div className="news-grid">
          {news.map((item) => (
            <NewsCard key={item.id} title={item.title} content={item.content} date={item.date} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
