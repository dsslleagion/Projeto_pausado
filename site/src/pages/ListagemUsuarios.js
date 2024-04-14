import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar';
import Footer from '../components/Footer';
import { Tabela } from '../components/Tabela'; // Importe o componente Tabela

const ListagemUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // Estado para armazenar o termo de busca

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

        {/* Barra de busca */}
        <input
          type="text"
          placeholder="Buscar usuário..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* Renderização da tabela */}
        <Tabela th={<>
          <th>Nome</th>
          <th>Email</th>
          <th>Ações</th>
        </>}>
          {usuarios.filter(user => {
            // Filtragem de usuários com base no termo de busca
            if (!searchTerm) return true;
            return user.nome.toLowerCase().includes(searchTerm.toLowerCase()) || user.email.toLowerCase().includes(searchTerm.toLowerCase());
          }).map((usuario) => (
            <tr key={usuario.id}>
              <td>{usuario.nome}</td>
              <td>{usuario.email}</td>
              <td>
                <button> <Link
                  to={{
                    pathname: `/cadastroAdm/${usuario.id}`,
                    search: `?email=${usuario.email}` // Adiciona o email como query parameter
                  }}
                  className="edit-button"
                >
                  Editar
                </Link></button>
                <button onClick={() => handleExcluirUsuario(usuario.id)} className="delete-button">Excluir</button>
              </td>
            </tr>
          ))}
        </Tabela>

        <button ><Link to="/cadastroA/true">Cadastrar</Link></button>
      </div>
      <Footer />
    </div>
  );
};

export default ListagemUsuarios;
