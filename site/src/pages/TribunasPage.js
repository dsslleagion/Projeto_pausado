// TribunasPage.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './TribunasPage.css';
import NavigationBar from '../components/NavigationBar';
import Footer from '../components/Footer';

const TribunasPage = () => {
  const [tribunas, setTribunas] = useState([]);
 

  useEffect(() => {
    fetchTribunas();
  }, []);

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
    <div className="">
      <NavigationBar></NavigationBar>
    <div className="tribunas-page container">
      <h1>Tribunas</h1>
      <div className="tribuna">
        {tribunas.map((item) => (
          <div>
            <h2>{item.nome}</h2>
            <p>{item.descricao}</p>
          </div>
        ))}
        
      </div>
    
    </div>
    <Footer></Footer>
    </div>
  );
};

export default TribunasPage;
