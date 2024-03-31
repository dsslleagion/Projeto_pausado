import React from 'react';
import { Bar } from 'react-chartjs-2';

const GraficoIntencaoVoto = ({ dados }) => {
  const labels = dados.map(item => item.candidato);
  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Intenção de Voto',
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(75,192,192,0.4)',
        hoverBorderColor: 'rgba(75,192,192,1)',
        data: dados.map(item => item.intencao),
      },
    ],
  };

  return <Bar data={data} key={JSON.stringify(data)} />;
};

export default GraficoIntencaoVoto;
