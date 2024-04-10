import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar';
import Footer from '../components/Footer';
import { Tabela } from '../components/Tabela';
import TribunaItem from '../components/TribunaItem';

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
      const updatedTribunas = tribunas.filter((tribuna) => tribuna.id !== id);
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
        <Tabela th={<><th>ID</th><th>Descrição</th><th>Ação</th></>}>
          {tribunas.map((tribuna) => (
            <tr key={tribuna.id}>
              <td>{tribuna.id}</td>
              <td>{tribuna.descricao}</td>
              <td>
                <button onClick={() => handleDelete(tribuna.id)}>Excluir</button>
                <Link to={`/CadastroTribunas/${tribuna.id}`}>
                  <button>Editar</button>
                </Link>
              </td>
            </tr>
          ))}
        </Tabela>
        <button><Link to="/cadastroTribunas">Cadastrar</Link></button>
      </div>
      <Footer />
    </div>
  );
};

export default ListagemTribunas;
