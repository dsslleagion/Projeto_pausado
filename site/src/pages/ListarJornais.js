import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar';
import Footer from '../components/Footer';
import { Tabela } from '../components/Tabela'; // Importe o componente de tabela

const ListaJornais = () => {
  const [jornais, setJornais] = useState([]);

  useEffect(() => {
    fetchJornais();
  }, []);

  const fetchJornais = async () => {
    try {
      const response = await fetch('http://localhost:3001/jornal/all');
      if (response.ok) {
        const data = await response.json();
        setJornais(data);
      } else {
        console.error('Erro ao buscar jornais:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao buscar jornais:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/jornal/delete/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        console.log('Jornal excluído com sucesso!');
        // Atualizar a lista de usuários após excluir
        fetchJornais();
      } else {
        console.error('Erro ao excluir Jornal:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao excluir Jornal:', error.message);
    }
  };

  return (
    <div>
      <NavigationBar />
      <div className='container'>
        <h1>Lista de Jornais</h1>
        {/* Utilize o componente Tabela aqui */}
        <Tabela th={[<th key="titulo">Título</th>, <th key="acoes">Ações</th>]}>
          {/* Mapeie os jornais para criar as linhas da tabela */}
          {jornais.map((jornal) => (
            <tr key={jornal.id}>
              <td>{jornal.titulo}</td>
              <td>
                {/* Botão para excluir jornal */}
                <button onClick={() => handleDelete(jornal.id)}>Excluir</button>
                {/* Botão para editar jornal */}
                <Link to={`/cadastroJornal/${jornal.id}`}>
                  <button>Editar</button>
                </Link>
              </td>
            </tr>
          ))}
        </Tabela>
        <button ><Link to="/cadastroJornal">Cadastrar</Link></button>
      </div>
      <Footer />
    </div>
  );
};

export default ListaJornais;
