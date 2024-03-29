import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
const ListarNoticias = () => {
  const [noticias, setNoticias] = useState([]);
  const params = useParams();

  const fetchNoticias = async () => {
    try {
      const response = await fetch('/noticia/all', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        }
      });
      if (response.ok) {
        const data = await response.json();
        setNoticias(data);
      } else {
        console.error('Erro ao buscar notícias:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao buscar notícias:', error.message);
    }
  };

  useEffect(() => {
    fetchNoticias();
  }, []);

  const handleEditarNoticia = (id) => {
    // Redireciona para a página de cadastro/editar, passando o ID como parâmetro na URL
    window.location.href = `/cadastroNoticia/${id}`;
  };

  const handleExcluirNoticia = async (id) => {
    try {
      const response = await fetch(`/noticia/delete/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        console.log('Notícia excluída com sucesso!');
        fetchNoticias();
      } else {
        console.error('Erro ao excluir notícia:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao excluir notícia:', error.message);
    }
  };

  return (
    <div>
      <NavigationBar />
      <div className="container">
        <h2>Notícias</h2>
        <div className="noticias-container">
          {noticias.map((noticia) => (
            <div className="noticia-card" key={noticia.id}>
              <strong>{noticia.titulo}</strong>
              <p>{noticia.conteudo}</p>
              <div className="buttons-container">
                <button onClick={() => handleEditarNoticia(noticia.id)} className="edit-button">Editar</button>
                <button onClick={() => handleExcluirNoticia(noticia.id)} className="delete-button">Excluir</button>
              </div>
            </div>
          ))}
        </div>
        <button ><Link to="/cadastroNoticia">Cadastrar</Link></button>
      </div>
      <Footer />
    </div>
  );
};

export default ListarNoticias;
