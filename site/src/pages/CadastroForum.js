import React, { useState, useEffect } from 'react';
import './CadastroForum.css';
import NavigationBar from '../components/NavigationBar';
import Button from '../components/Button';
import Footer from '../components/Footer';
import { useParams } from 'react-router-dom';

const CadastroForum = () => {
  const { id } = useParams();
  const [conteudo, setConteudo] = useState('');
  const [idEditar, setIdEditar] = useState(null);

  useEffect(() => {
    if (id) {
      setIdEditar(id);
      fetchReclamacao(id)
        .then(data => {
          setConteudo(data.conteudo);
        })
        .catch(error => {
          console.error('Erro ao buscar reclamação:', error);
        });
    }
  }, [id]);

  const fetchReclamacao = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/form/one/${id}`);
      if (!response.ok) {
        throw new Error('Erro ao buscar reclamação');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error('Erro ao buscar reclamação: ' + error.message);
    }
  };

  const handleChange = (e) => {
    setConteudo(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (idEditar) {
        await editarReclamacao(idEditar, { conteudo });
        console.log('Reclamação editada com sucesso!');
      } else {
        await cadastrarReclamacao({ conteudo });
        console.log('Reclamação cadastrada com sucesso!');
      }
      setConteudo('');
      window.location.href = '/ListagemForum';
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

  return (
    <div>
      <NavigationBar />
      <div className="container">
        <h1 className="title">{idEditar ? 'Editar Reclamação' : 'Cadastro de Reclamações'}</h1>
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
      </div>
      <Footer />
    </div>
  );
};

export default CadastroForum;
