import React, { useState, useEffect } from 'react';
import NavigationBar from '../components/NavigationBar';
import Footer from '../components/Footer';
import GraficoIntencaoVoto from '../components/GraficoIntencaoVoto';
import GraficoInteresseTribunas from '../components/GraficoInteresseTribunas';

const EstatisticasPage = () => {
  const [dadosIntencaoVoto, setDadosIntencaoVoto] = useState([]);
  const [dadosInteresseTribunas, setDadosInteresseTribunas] = useState([]);
  const [filtroCidade, setFiltroCidade] = useState('');
  const [filtroEstado, setFiltroEstado] = useState('');
  const [filtroCandidato, setFiltroCandidato] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseIntencaoVoto = await fetch('http://localhost:3001/estatisticas/intencao-voto/clientes');
        if (!responseIntencaoVoto.ok) {
          throw new Error('Erro ao buscar dados de intenção de voto por cliente');
        }
        const dadosIntencaoVoto = await responseIntencaoVoto.json();

        const responseInteresseTribunas = await fetch('http://localhost:3001/estatisticas/interesse-tribunas/clientes');
        if (!responseInteresseTribunas.ok) {
          throw new Error('Erro ao buscar dados de interesse nas tribunas por cliente');
        }
        const dadosInteresseTribunas = await responseInteresseTribunas.json();

        setDadosIntencaoVoto(dadosIntencaoVoto);
        setDadosInteresseTribunas(dadosInteresseTribunas);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <NavigationBar />
      <div className="container">
        <h1>Estatísticas e Controle</h1>

        {/* Gráfico de Intenção de Voto */}
        <h2>Intenção de Voto por Cliente</h2>
        <GraficoIntencaoVoto dados={dadosIntencaoVoto} />

        {/* Gráfico de Interesse nas Tribunas */}
        <h2>Interesse nas Tribunas por Cliente</h2>
        <GraficoInteresseTribunas dados={dadosInteresseTribunas} />
      </div>
      <Footer />
    </div>
  );
};

export default EstatisticasPage;
