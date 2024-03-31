import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import NavigationBar from '../components/NavigationBar';
import Footer from '../components/Footer';
import NewsCard from '../components/NewsCard';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const [news, setNews] = useState([]);
  const [mainNews, setMainNews] = useState([]);
  const [candidatos, setCandidatos] = useState([]);
  const [filtroData, setFiltroData] = useState('');
  const [filtroEstado, setFiltroEstado] = useState('');
  const [filtroCidade, setFiltroCidade] = useState('');
  const [filtroTribuna, setFiltroTribuna] = useState('');

  useEffect(() => {
    getData();
    fetchCandidatos();
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
          estado: item.estado,
          cidade: item.cidade,
          tribuna: item.tribuna
        }));
        setNews(formattedData);
        setMainNews(formattedData.slice(0, 3));
      })
      .catch((error) => {
        console.error('Erro ao obter notícias:', error);
      });
  }

  const fetchCandidatos = async () => {
    try {
      const response = await fetch('http://localhost:3001/candidato/all');
      if (!response.ok) {
        throw new Error('Erro ao buscar candidatos');
      }
      const data = await response.json();
      setCandidatos(data);
    } catch (error) {
      console.error('Erro ao buscar candidatos:', error);
    }
  };

  // Função para filtrar as notícias com base nos filtros selecionados
  const filtrarNoticias = () => {
    let noticiasFiltradas = news;

    if (filtroData) {
      noticiasFiltradas = noticiasFiltradas.filter(item => item.date.includes(filtroData));
    }

    if (filtroEstado) {
      noticiasFiltradas = noticiasFiltradas.filter(item => item.estado.toLowerCase().includes(filtroEstado.toLowerCase()));
    }

    if (filtroCidade) {
      noticiasFiltradas = noticiasFiltradas.filter(item => item.cidade.toLowerCase().includes(filtroCidade.toLowerCase()));
    }

    if (filtroTribuna) {
      noticiasFiltradas = noticiasFiltradas.filter(item => item.tribuna.toLowerCase().includes(filtroTribuna.toLowerCase()));
    }

    return noticiasFiltradas;
  };

  return (
    <div className="home-page">
      <NavigationBar />
      <div className="container">
        <div className="main-carousel">
          <Slider dots infinite autoplay>
            {candidatos.map((candidato) => (
              <Link to={`/CandidatoPage/${candidato.id}`} key={candidato.id}>
                <div className="carousel-candidato-item">
                  <img src={candidato.imagem} alt={candidato.nome} />
                  <div className="carousel-candidato-text">
                    <h3>{candidato.nome}</h3>
                    <p>{candidato.cargoPretendido}</p>
                  </div>
                </div>
              </Link>
            ))}
          </Slider>
        </div>
        <div className="container2">
          {/* Filtros */}
          <div className="filtros">
            <input type="text" placeholder="Data" value={filtroData} onChange={(e) => setFiltroData(e.target.value)} />
            <input type="text" placeholder="Estado" value={filtroEstado} onChange={(e) => setFiltroEstado(e.target.value)} />
            <input type="text" placeholder="Cidade" value={filtroCidade} onChange={(e) => setFiltroCidade(e.target.value)} />
            <input type="text" placeholder="Tribuna" value={filtroTribuna} onChange={(e) => setFiltroTribuna(e.target.value)} />
          </div>

          {/* Notícias principais */}
          <div className="main-news">
            <Slider dots infinite autoplay>
              {mainNews.map((item) => (
                <Link to={`/NoticiaPage/${item.id}`} key={item.id}>
                  <div className="carousel-news-item">
                    <div className="carousel-image-overlay">
                      <img src="https://picsum.photos/id/237/720/300" alt="Imagem Fictícia" />
                      <div className="carousel-news-content">
                        <h2>{item.title}</h2>
                        <span>{item.date}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </Slider>
            <div className="additional-card">
              {filtrarNoticias().map((item) => (
                <Link to={`/NoticiaPage/${item.id}`} key={item.id}>
                  <NewsCard title={item.title} date={item.date} />
                </Link>
              ))}
            </div>
          </div>

          {/* Notícias secundárias */}
          <div className="secondary-news">
            {filtrarNoticias().map((item) => (
              <Link to={`/NoticiaPage/${item.id}`} key={item.id}>
                <NewsCard title={item.title} date={item.date} />
              </Link>
            ))}
          </div>
        </div>

        <div className="container3">
          <div className="main-news2">
            <Slider dots infinite autoplay>
              {mainNews.map((item) => (
                <Link to={`/NoticiaPage/${item.id}`} key={item.id}>
                  <div className="carousel-news-item2">
                    <div className="carousel-image-overlay2">
                      <img src="https://picsum.photos/id/237/720/300" alt="Imagem Fictícia" />
                      <div className="carousel-news-content2">
                        <h2>{item.title}</h2>
                        <span>{item.date}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </Slider>
            <div className="additional-card">
              {filtrarNoticias().map((item) => (
                <Link to={`/NoticiaPage/${item.id}`} key={item.id}>
                  <NewsCard title={item.title} date={item.date} />
                </Link>
              ))}
            </div>
          </div>

          <div className="secondary-news2">
            {filtrarNoticias().map((item) => (
              <Link to={`/NoticiaPage/${item.id}`} key={item.id}>
                <NewsCard title={item.title} date={item.date} />
              </Link>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
