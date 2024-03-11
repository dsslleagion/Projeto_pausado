import React, { useState, useEffect } from 'react';
import NavigationBar from '../components/NavigationBar';
import Button from '../components/Button';
import './Cadastro.css';
import Footer from '../components/Footer';

const Cadastro = () => {
  const [formValues, setFormValues] = useState({
    nome: '',
    email: '',
    sexo: '',
    telefone: '',
    bairro: '',
    endereco: '',
    cidade: '',
    cep: '',
    redes_sociais: '',
    password: '',
    profile: 'user',
    tribunaId: '', // Inicializar como string vazia
    candidatoId: '', // Inicializar como string vazia
    tribunas: [],
    candidatos: []
  });

  useEffect(() => {
    fetch('http://localhost:3001/tribuna/all')
      .then(response => response.json())
      .then(data => {
        setFormValues(prevState => ({ ...prevState, tribunas: data }));
      })
      .catch(error => console.error('Erro ao carregar tribunas:', error));
    
    fetch('http://localhost:3001/candidato/all')
      .then(response => response.json())
      .then(data => {
        setFormValues(prevState => ({ ...prevState, candidatos: data }));
      })
      .catch(error => console.error('Erro ao carregar candidatos:', error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:3001/cliente/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...formValues,
        tribunaId: formValues.tribunaId ? parseInt(formValues.tribunaId) : null,
        candidatoId: formValues.candidatoId ? parseInt(formValues.candidatoId) : null
      })
    })
    .then(response => response.json())
    .then(clienteData => {
      console.log('Dados cadastrados com sucesso:', clienteData);
      const clienteId = clienteData.id;

      if (formValues.tribunaId) {
        const tribunaVinculo = {
          cliente: { id: clienteId },
          tribuna: { id: parseInt(formValues.tribunaId) }
        };

        fetch('http://localhost:3001/ct/post', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(tribunaVinculo)
        })
        .then(response => response.json())
        .then(data => {
          console.log('Vínculo com tribuna criado com sucesso:', data);
        })
        .catch(error => {
          console.error('Erro ao vincular cliente à tribuna:', error);
        });
      }

      if (formValues.candidatoId) {
        const candidatoVinculo = {
          cliente: { id: clienteId },
          candidato: { id: parseInt(formValues.candidatoId) }
        };

        fetch('http://localhost:3001/cc/post', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(candidatoVinculo)
        })
        .then(response => response.json())
        .then(data => {
          console.log('Vínculo com candidato criado com sucesso:', data);
        })
        .catch(error => {
          console.error('Erro ao vincular cliente ao candidato:', error);
        });
      }
    })
    .catch(error => {
      console.error('Erro ao cadastrar os dados:', error);
    });
  };

  return (
    <div>
      <NavigationBar />
      <div className="container">
        <h1 className="title">Cadastro</h1>
        <form onSubmit={handleSubmit} className="form">
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
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formValues.email}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="sexo">Sexo:</label>
            <select
              id="sexo"
              name="sexo"
              value={formValues.sexo}
              onChange={handleChange}
            >
              <option value="">Selecione</option>
              <option value="masculino">Masculino</option>
              <option value="feminino">Feminino</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="telefone">Telefone:</label>
            <input
              type="text"
              id="telefone"
              name="telefone"
              value={formValues.telefone}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="bairro">Bairro:</label>
            <input
              type="text"
              id="bairro"
              name="bairro"
              value={formValues.bairro}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="endereco">Endereço:</label>
            <input
              type="text"
              id="endereco"
              name="endereco"
              value={formValues.endereco}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="cidade">Cidade:</label>
            <input
              type="text"
              id="cidade"
              name="cidade"
              value={formValues.cidade}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="cep">CEP:</label>
            <input
              type="text"
              id="cep"
              name="cep"
              value={formValues.cep}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="redes_sociais">Rede Social Mais Utilizada:</label>
            <input
              type="text"
              id="redes_sociais"
              name="redes_sociais"
              value={formValues.redes_sociais}
              onChange={handleChange}
              placeholder="Exemplo: Instagram: @seuUsuario, Facebook: nome de usuário"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Senha:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formValues.password}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="tribunaId">Selecione uma tribuna:</label>
            <select
              id="tribunaId"
              name="tribunaId"
              value={formValues.tribunaId}
              onChange={handleChange}
            >
              <option value="">Selecione</option>
              {formValues.tribunas.map(tribuna => (
                <option key={tribuna.id} value={tribuna.id}>{tribuna.nome}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="candidatoId">Selecione um candidato:</label>
            <select
              id="candidatoId"
              name="candidatoId"
              value={formValues.candidatoId}
              onChange={handleChange}
            >
              <option value="">Selecione</option>
              {formValues.candidatos.map(candidato => (
                <option key={candidato.id} value={candidato.id}>{candidato.nome}</option>
              ))}
            </select>
          </div>
          <Button type="submit" text="Cadastrar" />
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Cadastro;
