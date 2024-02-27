import React, { useState } from 'react';
import NavigationBar from '../components/NavigationBar';
import Button from '../components/Button';
import './CadastroJornal.css';
import Footer from '../components/Footer';

const CadastroJornal = () => {
  const [formValues, setFormValues] = useState({
    titulo: '',
    autor: '',
    conteudo: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Formulário submetido:', formValues);
    // Adicione aqui a lógica para enviar os dados do formulário para o backend
  };

  return (
    <div>
      <NavigationBar />
      <div className="jornal-page">
        <div className="jornal-content">
          <h1>Cadastro de Notícia</h1>
          <form onSubmit={handleSubmit} className="form">
            <div className="form-group">
              <label htmlFor="titulo">Título:</label>
              <input
                type="text"
                id="titulo"
                name="titulo"
                value={formValues.titulo}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="autor">Autor:</label>
              <input
                type="text"
                id="autor"
                name="autor"
                value={formValues.autor}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="conteudo">Conteúdo:</label>
              <textarea
                id="conteudo"
                name="conteudo"
                value={formValues.conteudo}
                onChange={handleChange}
              ></textarea>
            </div>
            <Button type="submit" text="Cadastrar" />
          </form>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default CadastroJornal;
