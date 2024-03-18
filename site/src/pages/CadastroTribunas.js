// CadastroTribunas.js
import React, { useState, useEffect } from 'react';
import NavigationBar from '../components/NavigationBar';
import Footer from '../components/Footer';
import './CadastroTribuna.css';

const CadastroTribunas = () => {
  const [tribunas, setTribunas] = useState([]);
  const [formData, setFormData] = useState({
    nome: ''
  });
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState('');

  useEffect(() => {
    fetchTribunas();
  }, []);

  const fetchTribunas = async () => {
    try {
      const response = await fetch('http://localhost:3001/tribuna/all');
      if (!response.ok) {
        throw new Error('Erro ao buscar tribunas');
      }
      const data = await response.json();
      setTribunas(data);
    } catch (error) {
      console.error('Erro ao buscar tribunas:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/tribuna/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (!response.ok) {
        throw new Error('Erro ao cadastrar tribuna');
      }
      setFormData({ nome: '' });
      fetchTribunas();
    } catch (error) {
      console.error('Erro ao cadastrar tribuna:', error);
    }
  };

  const handleEdit = (tribuna) => {
    setFormData({
      nome: tribuna.nome
    });
    setEditMode(true);
    setEditId(tribuna.id);
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:3001/tribuna/put/${editId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (!response.ok) {
        throw new Error('Erro ao atualizar tribuna');
      }
      setFormData({ nome: '' });
      setEditMode(false);
      fetchTribunas();
    } catch (error) {
      console.error('Erro ao atualizar tribuna:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/tribuna/delete/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error('Erro ao excluir tribuna');
      }
      fetchTribunas();
    } catch (error) {
      console.error('Erro ao excluir tribuna:', error);
    }
  };

  return (
    <div>
      <NavigationBar />
      <div className="container">
        <div className="cadastro-tribuna">
          <h1>Cadastro de Tribuna</h1>
          <form onSubmit={editMode ? handleUpdate : handleSubmit}>
            <div className="form-group">
              <label htmlFor="nome">Nome:</label>
              <input
                type="text"
                id="nome"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <button className="button" type="submit">{editMode ? 'Atualizar' : 'Cadastrar'}</button>
            </div>
          </form>
          <h2>Tribunas Cadastradas</h2>
          <ul>
            {tribunas.map((tribuna) => (
              <li key={tribuna.id}>
                {tribuna.nome}
                <button className="button" onClick={() => handleEdit(tribuna)}>Editar</button>
                <button className="button" onClick={() => handleDelete(tribuna.id)}>Excluir</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CadastroTribunas;
