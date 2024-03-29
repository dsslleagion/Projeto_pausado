// Arquivo ListagemCandidatos.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar';
import Footer from '../components/Footer';

const ListagemCandidatos = () => {
  const [candidatos, setCandidatos] = useState([]);

  useEffect(() => {
    fetchCandidatos();
  }, []);

  const fetchCandidatos = async () => {
    try {
      const response = await fetch('http://localhost:3001/candidato/all');
      if (!response.ok) {
        throw new Error('Erro ao buscar candidatos');
      }
      const data = await response.json();
      setCandidatos(data);
    } catch (error) {
      console.error('Erro ao buscar candidatos:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/candidato/delete/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error('Erro ao excluir candidato');
      }
      fetchCandidatos();
    } catch (error) {
      console.error('Erro ao excluir candidato:', error);
    }
  };

  return (
    <div>
        <NavigationBar></NavigationBar>
        <div className='container'>
      <h1>Listagem de Candidatos</h1>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Partido</th>
            <th>Cargo Pretendido</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {candidatos.map((candidato) => (
            <tr key={candidato.id}>
              <td>{candidato.nome}</td>
              <td>{candidato.partido}</td>
              <td>{candidato.cargoPretendido}</td>
              <td>
                <button><Link to={`/cadastroCandidato/${candidato.id}`}>Editar</Link></button>
                <button onClick={() => handleDelete(candidato.id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button ><Link to="/cadastroCandidato">Cadastrar</Link></button>
    </div>
    <Footer></Footer>
    </div>
  );
};

export default ListagemCandidatos;
