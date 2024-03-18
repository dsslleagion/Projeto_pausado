import React, { useState, useEffect } from 'react';
import './CadastroCandidato.css';
import NavigationBar from '../components/NavigationBar';
import Footer from '../components/Footer';

const CadastroCandidato = () => {
  const [formValues, setFormValues] = useState({
    id: '',
    nome: '',
    partido: '',
    cargo: ''
  });

  const [candidatos, setCandidatos] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/candidato/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formValues)
      });
      if (!response.ok) {
        throw new Error('Erro ao cadastrar candidato');
      }
      setFormValues({
        id: '',
        nome: '',
        partido: '',
        cargo: ''
      });
      fetchCandidatos();
    } catch (error) {
      console.error('Erro ao cadastrar candidato:', error);
    }
  };

  const fetchCandidatos = async () => {
    try {
      const response = await fetch('http://localhost:3001/candidato/all');
      if (!response.ok) {
        throw new Error('Erro ao buscar candidatos');
      }
      const data = await response.json();
      setCandidatos(data);
    } catch (error) {
      console.error('Erro ao buscar candidatos:', error);
    }
  };

  useEffect(() => {
    fetchCandidatos();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/candidato/delete/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error('Erro ao excluir candidato');
      }
      fetchCandidatos();
    } catch (error) {
      console.error('Erro ao excluir candidato:', error);
    }
  };

  const handleEdit = (candidato) => {
    setFormValues({
      id: candidato.id,
      nome: candidato.nome,
      partido: candidato.partido,
      cargo: candidato.cargo
    });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3001/candidato/put/${formValues.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formValues)
      });
      if (!response.ok) {
        throw new Error('Erro ao atualizar candidato');
      }
      setFormValues({
        id: '',
        nome: '',
        partido: '',
        cargo: ''
      });
      fetchCandidatos();
    } catch (error) {
      console.error('Erro ao atualizar candidato:', error);
    }
  };

  return (
    <div>
      <NavigationBar />
      <div className="container">
        <div className="cadastro-candidato">
          <h1>Cadastro de Candidato</h1>
          <form onSubmit={formValues.id ? handleEditSubmit : handleSubmit}>
            <input type="hidden" name="id" value={formValues.id} />
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
            <button type="submit">{formValues.id ? 'Salvar Alterações' : 'Cadastrar Candidato'}</button>
          </form>
          <h2>Candidatos Cadastrados</h2>
          <ul>
            {candidatos.map((candidato) => (
              <li key={candidato.id}>
                {candidato.nome} ({candidato.partido}) - {candidato.cargo}
                <button onClick={() => handleEdit(candidato)}>Editar</button>
                <button onClick={() => handleDelete(candidato.id)}>Excluir</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CadastroCandidato;
