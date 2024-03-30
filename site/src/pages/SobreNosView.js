import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar';
import Footer from '../components/Footer';
import TribunaItem2 from '../components/TribunaItem2'; // Importe o componente TribunaItem aqui

const SobreNosView = () => {
  const { id } = useParams();
  const [sobreNos, setSobreNos] = useState(null);
  const [tribunas, setTribunas] = useState([]);

  useEffect(() => {
    fetchSobreNosDetails(id);
    fetchTribunas();
  }, [id]);

  const fetchSobreNosDetails = async (id) => {
    try {
      const response = await fetch(`/sobre-nos/${id}`);
      if (response.ok) {
        const data = await response.json();
        setSobreNos(data);
      } else {
        console.error('Erro ao buscar detalhes do item "Sobre Nós":', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao buscar detalhes do item "Sobre Nós":', error.message);
    }
  };

  const fetchTribunas = async () => {
    try {
      const response = await fetch('http://localhost:3001/tribuna/all');
      if (!response.ok) {
        throw new Error('Erro ao buscar tribunas');
      }
      const data = await response.json();
      setTribunas(data);
    } catch (error) {
      console.error('Erro ao buscar tribunas:', error);
    }
  };

  return (
    <div>
      <NavigationBar />
      <div className="container">
        <h1>Sobre Nós - Detalhes</h1>
        {sobreNos ? (
          <div>
            <div className="sobre-nos-info">
              <img src={sobreNos.fotoUrl} alt={sobreNos.nome} />
              <div>
                <h2>{sobreNos.nome}</h2>
                <p>Cargo: {sobreNos.cargo}</p>
              </div>
            </div>
            <div className="sobre-nos-historia">
              <h3>História da Fundação</h3>
              <p>{sobreNos.historia}</p>
            </div>
          </div>
        ) : (
          <p>Carregando...</p>
        )}
        <div className="tribuna">
          {tribunas.map((tribuna) => (
            <TribunaItem2 tribuna={tribuna} /> // Use o componente TribunaItem aqui
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SobreNosView;
