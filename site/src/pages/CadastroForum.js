import React, { useState, useEffect } from 'react';
import './CadastroForum.css';
import NavigationBar from '../components/NavigationBar';
import Button from '../components/Button';
import Footer from '../components/Footer';

const CadastroForum = () => {
  const [conteudo, setConteudo] = useState('');
  const [reclamacoes, setReclamacoes] = useState([]);
  const [idEditar, setIdEditar] = useState(null); // Estado para armazenar o ID da reclamação a ser editada

  useEffect(() => {
    fetchReclamacoes();
  }, []);

  const handleChange = (e) => {
    setConteudo(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (idEditar) {
        await editarReclamacao(idEditar, { conteudo });
        setIdEditar(null); // Limpa o ID da reclamação a ser editada após a edição
      } else {
        await cadastrarReclamacao({ conteudo });
      }
      setConteudo('');
      console.log('Reclamação salva com sucesso!');
      fetchReclamacoes();
    } catch (error) {
      console.error('Erro ao salvar reclamação:', error.message);
    }
  };

  const cadastrarReclamacao = async (data) => {
    try {
      const response = await fetch('http://localhost:3001/form/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
      });
      if (!response.ok) {
        throw new Error('Erro ao cadastrar reclamação: ' + response.statusText);
      }
    } catch (error) {
      throw new Error('Erro ao cadastrar reclamação: ' + error.message);
    }
  };

  const editarReclamacao = async (id, data) => {
    try {
      const response = await fetch(`http://localhost:3001/form/put/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
      });
      if (!response.ok) {
        throw new Error('Erro ao editar reclamação: ' + response.statusText);
      }
    } catch (error) {
      throw new Error('Erro ao editar reclamação: ' + error.message);
    }
  };

  const fetchReclamacoes = async () => {
    try {
      const response = await fetch('http://localhost:3001/form/all', {
        method: 'GET'
      });
      if (response.ok) {
        const data = await response.json();
        setReclamacoes(data);
      } else {
        console.error('Erro ao buscar reclamações:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao buscar reclamações:', error.message);
    }
  };

  const handleExcluirReclamacao = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/form/delete/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        console.log('Reclamação excluída com sucesso!');
        fetchReclamacoes();
      } else {
        console.error('Erro ao excluir reclamação:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao excluir reclamação:', error.message);
    }
  };

  const handleEditarReclamacao = (id, conteudo) => {
    setIdEditar(id);
    setConteudo(conteudo);
  };

  return (
    <div>
      <NavigationBar />
      <div className="container">
        <h1 className="title">Cadastro de Reclamações</h1>
        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label htmlFor="conteudo">Conteúdo da reclamação:</label>
            <textarea
              id="conteudo"
              name="conteudo"
              value={conteudo}
              onChange={handleChange}
              rows={5}
            />
          </div>
          <Button type="submit" text={idEditar ? 'Salvar Edição' : 'Enviar Reclamação'} />
        </form>
        <h2>Lista de Reclamações</h2>
        <ul>
          {reclamacoes.map((reclamacao) => (
            <li key={reclamacao.id}>
              {reclamacao.conteudo}
              <button onClick={() => handleExcluirReclamacao(reclamacao.id)}>Excluir</button>
              <button onClick={() => handleEditarReclamacao(reclamacao.id, reclamacao.conteudo)}>Editar</button>
            </li>
          ))}
        </ul>
      </div>
      <Footer />
    </div>
  );
};

export default CadastroForum;
