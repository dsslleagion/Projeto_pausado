import React, { useState, useEffect } from 'react';
import NavigationBar from '../components/NavigationBar';
import Footer from '../components/Footer';
import { useParams } from 'react-router-dom';
import './NoticiasPage.css';

const NoticiaPage = () => {
  const { id } = useParams();
  const [noticia, setNoticia] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNoticia = async () => {
      try {
        const response = await fetch(`http://localhost:3001/noticia/one/${id}`);
        if (!response.ok) {
          throw new Error('Erro ao buscar notícia');
        }
        const data = await response.json();
        setNoticia(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchNoticia();
  }, [id]);

  if (loading) {
    return <p>Carregando notícia...</p>;
  }

  if (error) {
    return <p>Ocorreu um erro: {error}</p>;
  }

  console.log(noticia);
  return (
    <div>
      <NavigationBar />
      <div className="noticia-container">
        {noticia ? (
          <div>
            <h1>{noticia.titulo}</h1>
            <p>{noticia.conteudo}</p>
            <span>{noticia. dataPublicacao}</span>
          </div>
        ) : (
          <p>Nenhuma notícia encontrada</p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default NoticiaPage;
