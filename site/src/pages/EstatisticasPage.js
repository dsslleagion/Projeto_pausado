import React, { useState, useEffect } from 'react';
import NavigationBar from '../components/NavigationBar';
import Footer from '../components/Footer';
import GraficoIntencaoVoto from '../components/GraficoIntencaoVoto';
import GraficoInteresseTribunas from '../components/GraficoInteresseTribunas';
import GraficoInteresseClientesPorTribuna from '../components/GraficoInteresseClientesPorTribuna'; // Novo componente
import GraficoIntencaoVotoPorCandidato from '../components/GraficoIntencaoVotoPorCandidato'; // Novo componente

const EstatisticasPage = () => {
  const [dadosIntencaoVoto, setDadosIntencaoVoto] = useState([]);
  const [dadosInteresseTribunas, setDadosInteresseTribunas] = useState([]);
  const [dadosInteresseClientesPorTribuna, setDadosInteresseClientesPorTribuna] = useState([]); // Novo estado
  const [dadosIntencaoVotoPorCandidato, setDadosIntencaoVotoPorCandidato] = useState([]); // Novo estado

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

        const responseInteresseClientesPorTribuna = await fetch('http://localhost:3001/estatisticas/cliente/interesse-tribunas'); // Nova chamada
        if (!responseInteresseClientesPorTribuna.ok) {
          throw new Error('Erro ao buscar dados de interesse de clientes por tribuna');
        }
        const dadosInteresseClientesPorTribuna = await responseInteresseClientesPorTribuna.json();

        const responseIntencaoVotoPorCandidato = await fetch('http://localhost:3001/estatisticas/candidato/intencao-voto'); // Nova chamada
        if (!responseIntencaoVotoPorCandidato.ok) {
          throw new Error('Erro ao buscar dados de intenção de voto por candidato');
        }
        const dadosIntencaoVotoPorCandidato = await responseIntencaoVotoPorCandidato.json();

        setDadosIntencaoVoto(dadosIntencaoVoto);
        setDadosInteresseTribunas(dadosInteresseTribunas);
        setDadosInteresseClientesPorTribuna(dadosInteresseClientesPorTribuna); // Atualizar estado
        setDadosIntencaoVotoPorCandidato(dadosIntencaoVotoPorCandidato); // Atualizar estado
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

        {/* Novo gráfico: Interesse de Clientes por Tribuna */}
        <h2>Interesse de Clientes por Tribuna</h2>
        <GraficoInteresseClientesPorTribuna dados={dadosInteresseClientesPorTribuna} />

        {/* Novo gráfico: Intenção de Voto por Candidato */}
        <h2>Intenção de Voto por Candidato</h2>
        <GraficoIntencaoVotoPorCandidato dados={dadosIntencaoVotoPorCandidato} />
      </div>
      <Footer />
    </div>
  );
};

export default EstatisticasPage;
