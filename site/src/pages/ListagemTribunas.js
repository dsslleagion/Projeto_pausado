import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TribunaItem from '../components/TribunaItem';
import NavigationBar from '../components/NavigationBar';
import Footer from '../components/Footer';
// Importe o arquivo CSS

const ListagemTribunas = () => {
  const [tribunas, setTribunas] = useState([]);

  useEffect(() => {
    fetchTribunasFromAPI();
  }, []);

  const fetchTribunasFromAPI = async () => {
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

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/tribuna/delete/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Erro ao excluir tribuna');
      }
      const updatedTribunas = tribunas.filter(tribuna => tribuna.id !== id);
      setTribunas(updatedTribunas);
      alert('Tribuna excluída com sucesso!');
    } catch (error) {
      console.error('Erro ao excluir tribuna:', error);
    }
  };

  return (
    <div>
      <NavigationBar />
      <div className='container'>
      <h1>Listagem de Tribunas</h1>
      <div className='container23'> {/* Remova a classe container */}
        {tribunas.map((tribuna) => (
          <TribunaItem key={tribuna.id} tribuna={tribuna} onDelete={handleDelete} />
        ))}
      </div>
      <button ><Link to="/cadastroTribunas">Cadastrar</Link></button>
      </div>
      <Footer />
    </div>
  );
};

export default ListagemTribunas;
