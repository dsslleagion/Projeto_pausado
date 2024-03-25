import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './CandidatoPage.css';
import NavigationBar from '../components/NavigationBar';
import Footer from '../components/Footer';

const CandidatoPage = () => {
  const { id } = useParams();
  const [candidato, setCandidato] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCandidatoById = async () => {
    try {
      const response = await fetch(`http://localhost:3001/candidato/one/${id}`);
      if (!response.ok) {
        throw new Error('Erro ao buscar candidato');
      }
      const data = await response.json();
      console.log(response);
      setCandidato(data);
      setLoading(false);
    } catch (error) {
      console.error('Erro ao buscar candidato:', error);
      setError(error.message);
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchCandidatoById();
  }, [id]);

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>Ocorreu um erro: {error}</div>;
  }

  return (
    <div>
      <NavigationBar />
      <div className="container">
        {candidato && (
          <>
            <h1>{candidato.nome}</h1>
            <p>Partido: {candidato.partido}</p>
            <p>Cargo: {candidato.cargoPretendido}</p>
            <p>Biografia: {candidato.biografia}</p>
            <img
              className="rounded-circle"
              src={candidato.imagem}
              alt="avatar"
              style={{ width: '30%', height: '30%', objectFit: 'cover' }}
            />
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default CandidatoPage;
