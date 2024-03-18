import React, { useState, useEffect } from 'react';
import NavigationBar from '../components/NavigationBar';
import Footer from '../components/Footer';
import './JornalPage.css';

const JornalPage = () => {
  const [jornais, setJornais] = useState([]);

  useEffect(() => {
    fetchJornais();
  }, []);

  const fetchJornais = async () => {
    try {
      const response = await fetch('http://localhost:3001/jornal/all');
      if (response.ok) {
        const data = await response.json();
        setJornais(data);
      } else {
        console.error('Erro ao buscar jornais:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao buscar jornais:', error);
    }
  };

  return (
    <div>
      <NavigationBar />
      <div className="jornal-page">
        <div className="jornal-content">
          <h1>Cá entre nós</h1>
          {jornais.map((jornal) => (
            <article key={jornal.id} className="article">
              <h2>{jornal.titulo}</h2>
              <p>{jornal.conteudo}</p>
              {/* Adicione um campo de imagem se houver uma imagem associada ao jornal */}
              {jornal.imagem && <img src={jornal.imagem} alt={jornal.titulo} />}
            </article>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default JornalPage;
