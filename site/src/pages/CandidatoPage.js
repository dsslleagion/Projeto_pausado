import React, { useState, useEffect } from 'react';
import './CandidatoPage.css';
import NavigationBar from '../components/NavigationBar';
import Footer from '../components/Footer';

const CandidatoPage = () => {
  const [candidato, setCandidato] = useState(null);


  const fetchCandidatos = async () => {
    try {
      const response = await fetch('http://localhost:3001/candidato/all');
      if (!response.ok) {
        throw new Error('Erro ao buscar candidatos');
      }
      const data = await response.json();
      setCandidato(data);
    } catch (error) {
      console.error('Erro ao buscar candidatos:', error);
    }
  };

  useEffect(() => {
    fetchCandidatos();
  }, []);

  if (!candidato) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      <NavigationBar></NavigationBar>
    <div className="container">
      {candidato.map((item) => (
        <div>
          <h1>{item.nome}</h1>
          <p>Partido: {item.partido}</p>
          <p>Cargo: {item.cargoPretendido}</p>
          <p>Biografia: {item.biografia}</p>
          <img
            className="rounded-circle"
            src={item.imagem}
            alt="avatar"
            style={{ width: '30%', height: '30%', objectFit: 'cover' }} // Ajuste o estilo conforme necessário
          />
        </div>
      ))}
      
      {/* Adicione mais detalhes do candidato conforme necessário */}
    </div>
    <Footer></Footer>
    </div>
  );
};

export default CandidatoPage;
