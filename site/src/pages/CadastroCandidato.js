import React, { useState } from 'react';
import './CadastroCandidato.css';
import NavigationBar from '../components/NavigationBar';
import Footer from '../components/Footer';

const CadastroCandidato = () => {
  const [formValues, setFormValues] = useState({
    nome: '',
    partido: '',
    cargo: '',
    // Adicione mais campos conforme necessário
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Formulário submetido:', formValues);
    // Adicione aqui a lógica para enviar os dados do candidato para o backend
  };

  return (
    <div>
      <NavigationBar></NavigationBar>
    <div className="cadastro-candidato">
      <h1>Cadastro de Candidato</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nome">Nome:</label>
          <input
            type="text"
            id="nome"
            name="nome"
            value={formValues.nome}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="partido">Partido:</label>
          <input
            type="text"
            id="partido"
            name="partido"
            value={formValues.partido}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="cargo">Cargo:</label>
          <input
            type="text"
            id="cargo"
            name="cargo"
            value={formValues.cargo}
            onChange={handleChange}
          />
        </div>
        {/* Adicione mais campos conforme necessário */}
        <button type="submit">Cadastrar Candidato</button>
      </form>
    </div>
    <Footer></Footer>
    </div>
  );
};

export default CadastroCandidato;
