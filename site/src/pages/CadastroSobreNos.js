import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar';
import Footer from '../components/Footer';

const CadastroSobreNos = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    nome: '',
    informacoes: '',
    fotoUrl: ''
  });

  useEffect(() => {
    if (id) {
      fetchSobreNosDetails(id);
    }
  }, [id]);

  const fetchSobreNosDetails = async (id) => {
    try {
      const response = await fetch(`/sobre-nos/${id}`);
      if (response.ok) {
        const data = await response.json();
        setFormData(data);
      } else {
        console.error('Erro ao buscar dados do item "Sobre Nós" para edição:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao buscar dados do item "Sobre Nós" para edição:', error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await atualizarSobreNos(id, formData);
      } else {
        await cadastrarSobreNos(formData);
      }
      setFormData({ nome: '', informacoes: '', fotoUrl: '' });
    } catch (error) {
      console.error('Erro ao cadastrar/atualizar item "Sobre Nós":', error.message);
    }
  };

  const cadastrarSobreNos = async (data) => {
    try {
      const response = await fetch('/sobre-nos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      if (response.ok) {
        console.log('Item "Sobre Nós" cadastrado com sucesso!');
      } else {
        console.error('Erro ao cadastrar item "Sobre Nós":', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao cadastrar item "Sobre Nós":', error.message);
    }
  };

  const atualizarSobreNos = async (id, data) => {
    try {
      const response = await fetch(`/sobre-nos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      if (response.ok) {
        console.log('Item "Sobre Nós" atualizado com sucesso!');
      } else {
        console.error('Erro ao atualizar item "Sobre Nós":', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao atualizar item "Sobre Nós":', error.message);
    }
  };

  return (
    <div>
      <NavigationBar />
      <div className="container">
        <h1>{id ? 'Editar' : 'Cadastrar'} Item de Sobre Nós</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="nome">Nome:</label>
            <input type="text" id="nome" name="nome" value={formData.nome} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="informacoes">Informações:</label>
            <textarea id="informacoes" name="informacoes" value={formData.informacoes} onChange={handleChange}></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="fotoUrl">URL da Foto:</label>
            <input type="text" id="fotoUrl" name="fotoUrl" value={formData.fotoUrl} onChange={handleChange} />
          </div>
          <button type="submit">{id ? 'Atualizar' : 'Cadastrar'}</button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default CadastroSobreNos;
