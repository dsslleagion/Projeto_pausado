import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './CandidatosPage.css';
import NavigationBar from '../components/NavigationBar';
import Footer from '../components/Footer';

const CandidatosPage = () => {
  const [candidatos, setCandidatos] = useState([]);

  // Exemplo de candidatos (pode ser substituído por uma chamada à API)
  const exemploCandidatos = [
    { id: 1, nome: 'Candidato 1', partido: 'Partido A', cargo: 'Presidente' },
    { id: 2, nome: 'Candidato 2', partido: 'Partido B', cargo: 'Governador' },
    { id: 3, nome: 'Candidato 3', partido: 'Partido C', cargo: 'Prefeito' },
  ];

  useEffect(() => {
    // Simulação de busca dos candidatos (pode ser substituído por uma chamada à API)
    setCandidatos(exemploCandidatos);
  }, []);

  return (
    <div>
      <NavigationBar></NavigationBar>
    <div className="candidatos-page">
      <h1>Candidatos a Eleições</h1>
      <ul>
        {candidatos.map((candidato) => (
          <li key={candidato.id}>
            <Link to={`/candidatos/${candidato.id}`}>
              <strong>{candidato.nome}</strong> ({candidato.partido}) - Cargo: {candidato.cargo}
            </Link>
          </li>
        ))}
      </ul>
    </div>
    <Footer></Footer>
    </div>
  );
};

export default CandidatosPage;
