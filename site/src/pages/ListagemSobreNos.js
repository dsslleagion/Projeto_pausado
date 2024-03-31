import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar';
import Footer from '../components/Footer';

const ListagemSobreNos = () => {
  const [sobreNosItems, setSobreNosItems] = useState([]);

  useEffect(() => {
    fetchSobreNos();
  }, []);

  const fetchSobreNos = async () => {
    try {
      const response = await fetch('/');
      if (response.ok) {
        const data = await response.json();
        setSobreNosItems(data);
      } else {
        console.error('Erro ao buscar itens "Sobre Nós":', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao buscar itens "Sobre Nós":', error.message);
    }
  };

  return (
    <div>
      <NavigationBar />
      <div className="container">
        <h1>Listagem de Sobre Nós</h1>
        {sobreNosItems.map((item) => (
          <div key={item.id} className="sobre-nos-item">
            <h2>{item.nome}</h2>
            <img src={item.fotoUrl} alt={item.nome} />
            <Link to={`/cadastroSobreNos/${item.id}`}>Ver Detalhes</Link>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default ListagemSobreNos;
