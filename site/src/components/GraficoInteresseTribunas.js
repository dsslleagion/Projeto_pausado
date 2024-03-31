import React from 'react';
import { Pie } from 'react-chartjs-2';

const GraficoInteresseTribunas = ({ dados }) => {
  const labels = dados.map(item => item.tribuna);
  const data = {
    labels: labels,
    datasets: [
      {
        data: dados.map(item => item.interesse),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
        ],
        hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
        ],
      },
    ],
  };

  return <Pie data={data} key={JSON.stringify(data)} />;
};

export default GraficoInteresseTribunas;
