// GraficoInteresseTribunas.js
import React from 'react';
import { PieChart, Pie, Tooltip, Legend } from 'recharts';

const GraficoInteresseTribunas = ({ dados }) => {
  return (
    <div>
      <h3>Interesse nas Tribunas por Cliente</h3>
      <PieChart width={400} height={400}>
        <Pie
          data={dados}
          dataKey="interesse"
          nameKey="tribuna"
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#8884d8"
          label
        />
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
};

export default GraficoInteresseTribunas;
