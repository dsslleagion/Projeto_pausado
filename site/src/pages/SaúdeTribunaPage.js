// SaúdeTribunaPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import './TribunasPage.css';
import NavigationBar from '../components/NavigationBar';
import Footer from '../components/Footer';

const SaúdeTribunaPage = () => {
  return (
    <div>
      <NavigationBar></NavigationBar>
    <div className="tribuna-page">
      <h1>Tribuna de Saúde</h1>
      <p>
        Detalhes e soluções propostas para a área de Saúde.
      </p>
      <Link to="/tribunas">Voltar para Tribunas</Link>
    </div>
    <Footer></Footer>
    </div>
  );
};

export default SaúdeTribunaPage;
