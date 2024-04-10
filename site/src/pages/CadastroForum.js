import React, { useState, useEffect } from 'react';
import './CadastroForum.css';
import NavigationBar from '../components/NavigationBar';
import Button from '../components/Button';
import Footer from '../components/Footer';
import { useParams } from 'react-router-dom';

const CadastroForum = () => {
  const { id } = useParams();
  const [titulo, setTitulo] = useState('');
  const [conteudo, setConteudo] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [bairro, setBairro] = useState('');
  const [idEditar, setIdEditar] = useState(null);

  useEffect(() => {
    if (id) {
      setIdEditar(id);
      fetchReclamacao(id)
        .then(data => {
          setTitulo(data.titulo);
          setConteudo(data.conteudo);
          setCidade(data.cidade);
          setEstado(data.estado);
          setBairro(data.bairro);
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
    const { name, value } = e.target;
    switch (name) {
      case 'titulo':
        setTitulo(value);
        break;
      case 'conteudo':
        setConteudo(value);
        break;
      case 'cidade':
        setCidade(value);
        break;
      case 'estado':
        setEstado(value);
        break;
      case 'bairro':
        setBairro(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      titulo,
      conteudo,
      cidade,
      estado,
      bairro
    };
    try {
      await cadastrarReclamacao(data);
      console.log('Reclamação cadastrada com sucesso!');
      clearFields();
      window.location.href = '/ListagemForum';
    } catch (error) {
      console.error('Erro ao salvar reclamação:', error.message);
    }
  };

  const editarReclamacao = async () => {
    const data = {
      titulo,
      conteudo,
      cidade,
      estado,
      bairro
    };
    try {
      await fetch(`http://localhost:3001/form/put/${idEditar}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
      });
      console.log('Reclamação editada com sucesso!');
      clearFields();
      window.location.href = '/ListagemForum';
    } catch (error) {
      console.error('Erro ao editar reclamação:', error.message);
    }
  };

  const clearFields = () => {
    setTitulo('');
    setConteudo('');
    setCidade('');
    setEstado('');
    setBairro('');
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

  return (
    <div>
      <NavigationBar />
      <div className="container">
        <h1 className="title">{idEditar ? 'Editar Reclamação' : 'Cadastro de Reclamações'}</h1>
        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label htmlFor="titulo">Título:</label>
            <input
              type="text"
              id="titulo"
              name="titulo"
              value={titulo}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="conteudo">Conteúdo da reclamação:</label>
            <textarea
              id="conteudo"
              name="conteudo"
              value={conteudo}
              onChange={handleChange}
              rows={5}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="cidade">Cidade:</label>
            <input
              type="text"
              id="cidade"
              name="cidade"
              value={cidade}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="estado">Estado:</label>
            <input
              type="text"
              id="estado"
              name="estado"
              value={estado}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="bairro">Bairro:</label>
            <input
              type="text"
              id="bairro"
              name="bairro"
              value={bairro}
              onChange={handleChange}
              required
            />
          </div>
          {idEditar ? (
            <Button type="button" onClick={editarReclamacao} text="Salvar Edição" />
          ) : (
            <Button type="submit" text="Enviar Reclamação" />
          )}
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default CadastroForum;
