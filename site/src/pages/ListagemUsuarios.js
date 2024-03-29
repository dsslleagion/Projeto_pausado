import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Importando o Link

import NavigationBar from '../components/NavigationBar';
import Footer from '../components/Footer';

const ListagemUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const fetchUsuarios = async () => {
    try {
      const response = await fetch('http://localhost:3001/cliente/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        }
      });
      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data)) {
          setUsuarios(data);
        } else {
          console.error('Erro ao buscar usuários: a resposta não é uma matriz.');
        }
      } else {
        console.error('Erro ao buscar usuários:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao buscar usuários:', error.message);
    }
  };

  const handleExcluirUsuario = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/cliente/delete/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        console.log('Usuário excluído com sucesso!');
        // Atualizar a lista de usuários após excluir
        fetchUsuarios();
      } else {
        console.error('Erro ao excluir usuário:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao excluir usuário:', error.message);
    }
  };

  return (
    <div>
      <NavigationBar />
      <div className="container">
        <h1>Listagem de Usuários</h1>
        <div className="usuarios-container">
          {usuarios.map((usuario) => (
            <div className="usuario-card" key={usuario.id}>
              <strong>{usuario.nome}</strong>
              <p>{usuario.email}</p>
              <div className="buttons-container">
                {/* Botão de Editar com Link para a página de cadastro/editar */}
                <button><Link to={`/cadastroAdm/${usuario.id}`} className="edit-button">Editar</Link></button>
                {/* Botão de Excluir */}
                <button onClick={() => handleExcluirUsuario(usuario.id)} className="delete-button">Excluir</button>
              </div>

            </div>
            
          ))}
        </div>
        <button ><Link to="/cadastroAdm">Cadastrar</Link></button>
      </div>
      <Footer />
    </div>
  );
};

export default ListagemUsuarios;
