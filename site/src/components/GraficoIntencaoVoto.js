// GraficoIntencaoVoto.js
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const GraficoIntencaoVoto = ({ dados }) => {
  return (
    <BarChart width={600} height={400} data={dados}>
      <XAxis dataKey="candidato" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="intencao" fill="rgba(75,192,192,0.2)" />
    </BarChart>
  );
};

export default GraficoIntencaoVoto;
