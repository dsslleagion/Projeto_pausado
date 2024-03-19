import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import NavigationBar from '../components/NavigationBar';
import NewsCard from '../components/NewsCard';
import Footer from '../components/Footer';
import './Home.css';

const Home = () => {
  const [news, setNews] = useState([]);
  const [mainNews, setMainNews] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  function getData() {
    fetch("http://localhost:3001/noticia/all", {
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
        setMainNews(formattedData.slice(0, 3));

      })
      .catch((error) => {
        console.error('Erro ao obter notícias:', error);
      });
  }

  return (
    <div className="home-page">
      <NavigationBar />
      <div className="">
      <div className="container2">
        <div className="main-news">
          <Slider dots infinite autoplay>
            {mainNews.map((item) => (
              <div key={item.id} className="carousel-news-item">
                <img src="https://via.placeholder.com/720x300" alt="Imagem Fictícia" />
                <h2>{item.title}</h2>
                <p>{item.content}</p>
                <span>{item.date}</span>
              </div>
            ))}
          </Slider>
        </div>

        <div className="secondary-news">
          {news.map((item) => (
            <NewsCard key={item.id} title={item.title} content={item.content} date={item.date} />
          ))}
        </div>
      </div>
      <div className="container3">
      <div className="list-news-down">
          {news.map((item) => (
            <NewsCard key={item.id} title={item.title} content={item.content} date={item.date} />
          ))}
        </div>
        </div>
        </div>
      <Footer />
    </div>
  );
};

export default Home;
