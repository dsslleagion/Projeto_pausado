import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ForumItem from '../components/ForumItem';
import NavigationBar from '../components/NavigationBar';
import Footer from '../components/Footer';
import './CadastroForum.css'; // Importe o arquivo CSS

const ListagemForum = () => {
  const [forums, setForums] = useState([]);

  useEffect(() => {
    fetchForums();
  }, []);

  console.log(forums);

  const fetchForums = async () => {
    try {
      const response = await fetch('http://localhost:3001/form/all'); // Alteração na URL da requisição
      if (!response.ok) {
        throw new Error('Erro ao buscar fóruns');
      }
      const data = await response.json();
      setForums(data);
    } catch (error) {
      console.error('Erro ao buscar fóruns:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/form/delete/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Erro ao excluir fórum');
      }
      const updatedForums = forums.filter(forum => forum.id !== id);
      setForums(updatedForums);
      alert('Fórum excluído com sucesso!');
    } catch (error) {
      console.error('Erro ao excluir fórum:', error);
    }
  };

  return (
    <div>
      <NavigationBar />
      <div className="container">        
        <h2>Listagem de Fóruns</h2>
        <div className="forum-list">
          {forums.map((forum) => (
            <ForumItem key={forum.id} forum={forum} onDelete={handleDelete} />
          ))}
        </div>
        <button><Link to="/CadastroForum">Cadastrar</Link></button>
      </div>
      <Footer />
    </div>
  );
};

export default ListagemForum;
