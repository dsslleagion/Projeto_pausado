import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar';
import Footer from '../components/Footer';

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
      <NavigationBar></NavigationBar>
      <div className='container'>
      <h1>Lista de Jornais</h1>
      <ul>
        {jornais.map((jornal) => (
          <li key={jornal.id}>
            {jornal.titulo}
            <button onClick={() => handleDelete(jornal.id)}>Excluir</button>
            <Link to={`/cadastroJornal/${jornal.id}`}>
              <button>Editar</button>
            </Link>
          </li>
        ))}
      </ul>
      <button ><Link to="/cadastroJornal">Cadastrar</Link></button>
      </div>

      <Footer></Footer>
    </div>
  );
};

export default ListaJornais;
