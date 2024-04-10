import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar';
import Footer from '../components/Footer';
import { Tabela } from '../components/Tabela';

const ListagemSobreNos = () => {
  const [sobreNosItems, setSobreNosItems] = useState([]);

  useEffect(() => {
    fetchSobreNos();
  }, []);

  const fetchSobreNos = async () => {
    try {
      const response = await fetch('http://localhost:3001/sobre/all'); // Certifique-se de ajustar a rota corretamente
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

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/sobre/delete/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        const updatedSobreNos = sobreNosItems.filter((item) => item.id !== id);
        setSobreNosItems(updatedSobreNos);
        alert('Item "Sobre Nós" excluído com sucesso!');
      } else {
        console.error('Erro ao excluir item "Sobre Nós":', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao excluir item "Sobre Nós":', error.message);
    }
  };

  return (
    <div>
      <NavigationBar />
      <div className="container">
        <h1>Listagem de Sobre Nós</h1>
        <Tabela th={<><th>ID</th><th>Nome</th><th>Foto</th><th>Ação</th></>}>
          {sobreNosItems.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.nome}</td>
              <td><img src={item.fotoUrl} alt={item.nome} /></td>
              <td>
                <button onClick={() => handleDelete(item.id)}>Excluir</button>
                <Link to={`/cadastroSobreNos/${item.id}`}>
                  <button>Editar</button>
                </Link>
              </td>
            </tr>
          ))}
        </Tabela>
        <button><Link to="/cadastroSobreNos">Cadastrar</Link></button>
      </div>
      <Footer />
    </div>
  );
};

export default ListagemSobreNos;
