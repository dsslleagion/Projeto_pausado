import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar';
import Footer from '../components/Footer';
import './CadastroTribuna.css';
import TribunaForm from '../components/TribunaForm';

const CadastroTribunas = () => {
  const { id } = useParams(); // Obtém o id da tribuna da URL
  const [formData, setFormData] = useState({ nome: '', descricao: '' });
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    if (id) {
      // Se um id for fornecido, busca os detalhes da tribuna correspondente
      fetchTribuna(id);
    }
  }, [id]);

  const fetchTribuna = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/tribuna/one/${id}`);
      if (!response.ok) {
        throw new Error('Erro ao buscar tribuna');
      }
      const data = await response.json();
      setFormData({ nome: data.nome, descricao: data.descricao, link_grupo:data.link_grupo });
      setEditMode(true); // Habilita o modo de edição
    } catch (error) {
      console.error('Erro ao buscar tribuna:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editMode ? `http://localhost:3001/tribuna/put/${id}` : 'http://localhost:3001/tribuna/post';
      const method = editMode ? 'PUT' : 'POST';
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error('Erro ao cadastrar/atualizar tribuna');
      }
      alert(editMode ? 'Tribuna atualizada com sucesso!' : 'Tribuna cadastrada com sucesso!');
      setFormData({ nome: '', descricao: '' });
      setEditMode(false);
    } catch (error) {
      console.error('Erro ao cadastrar/atualizar tribuna:', error);
    }
  };

  return (
    <div>
      <NavigationBar />
      <div className="container">
        <div className="cadastro-tribuna">
          <h1>Cadastro de Tribuna</h1>
          <TribunaForm
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            editMode={editMode}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CadastroTribunas;
