// GraficoIntencaoVotoPorCandidato.js

// GraficoIntencaoVotoPorCandidato.js
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const GraficoIntencaoVotoPorCandidato = ({ dados }) => {
  return (
    <div>
      <h3>Intenção de Voto por Candidato</h3>
      <BarChart width={400} height={300} data={dados}>
        <XAxis dataKey="candidato" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="intencao" fill="#82ca9d" />
      </BarChart>
    </div>
  );
};

export default GraficoIntencaoVotoPorCandidato;