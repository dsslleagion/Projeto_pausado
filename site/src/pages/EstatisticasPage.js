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

  // Dados simulados de intenção de voto
  const dadosIntencaoVotoSimulados = [
    { candidato: 'Candidato A', estado: 'São Paulo', cidade: 'São Paulo', intencao: 45 },
    { candidato: 'Candidato B', estado: 'Rio de Janeiro', cidade: 'Rio de Janeiro', intencao: 30 },
    { candidato: 'Candidato C', estado: 'Minas Gerais', cidade: 'Belo Horizonte', intencao: 25 },
    { candidato: 'Candidato A', estado: 'São Paulo', cidade: 'Campinas', intencao: 35 },
    { candidato: 'Candidato B', estado: 'Rio de Janeiro', cidade: 'Niterói', intencao: 20 },
    { candidato: 'Candidato C', estado: 'Minas Gerais', cidade: 'Uberlândia', intencao: 30 },
  ];

  // Dados simulados de interesse nas tribunas
  const dadosInteresseTribunasSimulados = [
    { tribuna: 'Educação', interesse: 60 },
    { tribuna: 'Saúde', interesse: 35 },
    { tribuna: 'Meio Ambiente', interesse: 45 },
  ];

  // Função para filtrar os dados de intenção de voto com base na cidade, estado e candidato
  const filtrarDadosIntencaoVoto = () => {
    let dadosFiltrados = dadosIntencaoVotoSimulados;

    if (filtroCidade) {
      dadosFiltrados = dadosFiltrados.filter(item => item.cidade.toLowerCase().includes(filtroCidade.toLowerCase()));
    }

    if (filtroEstado) {
      dadosFiltrados = dadosFiltrados.filter(item => item.estado.toLowerCase().includes(filtroEstado.toLowerCase()));
    }

    if (filtroCandidato) {
      dadosFiltrados = dadosFiltrados.filter(item => item.candidato.toLowerCase().includes(filtroCandidato.toLowerCase()));
    }

    setDadosIntencaoVoto(dadosFiltrados);
  };

  // Função para filtrar os dados de interesse nas tribunas com base no nome da tribuna
  const filtrarDadosInteresseTribunas = tribuna => {
    const dadosFiltrados = dadosInteresseTribunasSimulados.filter(item => !tribuna || item.tribuna === tribuna);
    setDadosInteresseTribunas(dadosFiltrados);
  };

  // Carregar todos os dados iniciais sem filtro
  useEffect(() => {
    filtrarDadosIntencaoVoto();
    filtrarDadosInteresseTribunas('');
  }, [filtroCidade, filtroEstado, filtroCandidato]);

  return (
    <div>
      <NavigationBar />
      <div className="container">
        <h1>Estatísticas e Controle</h1>

        {/* Filtros */}
        <div>
          <h2>Filtros</h2>
          <label>Cidade: </label>
          <input type="text" value={filtroCidade} onChange={e => setFiltroCidade(e.target.value)} />
          <label>Estado: </label>
          <input type="text" value={filtroEstado} onChange={e => setFiltroEstado(e.target.value)} />
          <label>Candidato: </label>
          <input type="text" value={filtroCandidato} onChange={e => setFiltroCandidato(e.target.value)} />
        </div>

        {/* Gráfico de Intenção de Voto */}
        <h2>Intenção de Voto por Candidato e Localização</h2>
        <GraficoIntencaoVoto dados={dadosIntencaoVoto} />

        {/* Gráfico de Interesse nas Tribunas */}
        <h2>Interesse nas Tribunas por Eleitor</h2>
        <GraficoInteresseTribunas dados={dadosInteresseTribunas} />
      </div>
      <Footer />
    </div>
  );
};

export default EstatisticasPage;
