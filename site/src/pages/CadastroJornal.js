import React, { useState, useEffect } from 'react';
import NavigationBar from '../components/NavigationBar';
import Button from '../components/Button';
import './CadastroJornal.css';
import Footer from '../components/Footer';

import { useParams } from 'react-router-dom';

const CadastroJornal = () => {
  const { id } = useParams();
  const [formValues, setFormValues] = useState({
    titulo: '',
    conteudo: '',
    dataPublicacao: new Date().toISOString()
  });

  useEffect(() => {
    if (id) {
      fetchJornal(id);
    }
  }, [id]);

  const fetchJornal = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/jornal/one/${id}`);
      if (response.ok) {
        const data = await response.json();
        setFormValues(data);
      } else {
        console.error('Erro ao buscar jornal:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao buscar jornal:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = id ? `http://localhost:3001/jornal/put/${id}` : 'http://localhost:3001/jornal/post';
      const method = id ? 'PUT' : 'POST';
      const response = await fetch(endpoint, {
        method: method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formValues)
      });
      if (response.ok) {
        console.log(`Jornal ${id ? 'editado' : 'cadastrado'} com sucesso!`);
        setFormValues({
          titulo: '',
          conteudo: '',
          dataPublicacao: new Date().toISOString()
        });
      } else {
        console.error(`Erro ao ${id ? 'editar' : 'cadastrar'} jornal:`, response.statusText);
      }
    } catch (error) {
      console.error(`Erro ao ${id ? 'editar' : 'cadastrar'} jornal:`, error);
    }
  };

  return (
    <div>
      <NavigationBar></NavigationBar>
      <div className='container'>
      <h1>{id ? 'Editar Jornal' : 'Cadastro de Jornal'}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="titulo">Título:</label>
          <input
            type="text"
            id="titulo"
            name="titulo"
            value={formValues.titulo}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="conteudo">Conteúdo:</label>
          <textarea
            id="conteudo"
            name="conteudo"
            value={formValues.conteudo}
            onChange={handleChange}
          ></textarea>
        </div>
        <button type="submit">{id ? 'Editar' : 'Cadastrar'}</button>
      </form>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default CadastroJornal;