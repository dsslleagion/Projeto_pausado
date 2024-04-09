import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar';
import './CadastroNoticia.css';
import Footer from '../components/Footer';
import MultiSelect from '../components/MultiSelect';
import { useContextoTribuna } from '../hooks';


const CadastroNoticia = () => {
  const [formData, setFormData] = useState({
    titulo: '',
    conteudo: '',
    dataPublicacao: '',
    cidade: '',
    estado: '',
    bairro: '',
    candidato: '',
    imagem: ''
  });
  const [editando, setEditando] = useState(false); // Variável para controlar se está editando uma notícia
  const [tribunalista, setTribuna] = useState([]);
  const { selectTribuna } = useContextoTribuna();
  const { id } = useParams();
  

  useEffect(() => {
    if (id) {
      // Se houver um ID na URL, significa que estamos editando uma notícia
      setEditando(true);
      // Aqui você pode fazer a lógica para buscar os dados da notícia pelo ID e preencher o formulário
      fetchNoticiaById(id);
    }
  }, [id]);

  const fetchNoticiaById = async (id) => {
    try {
      const response = await fetch(`/noticia/one/${id}`); // Substitua pelo endpoint correto
      if (response.ok) {
        const data = await response.json();
        setFormData(data);
      } else {
        console.error('Erro ao buscar notícia:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao buscar notícia:', error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editando) {
        await updateNoticia(id, formData);
      } else {
        await cadastrarNoticia(formData);
      }
      // Limpar o formulário após o envio bem-sucedido
      setFormData({ titulo: '', conteudo: '', dataPublicacao: '', cidade: '', estado: '', bairro: '', candidato: '', imagem: '' });
    } catch (error) {
      console.error('Erro ao cadastrar/atualizar notícia:', error.message);
    }
  };

  const cadastrarNoticia = async (data) => {
    try {
      const response = await fetch('/noticia/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
      });
      if (response.ok) {
        console.log('Notícia cadastrada com sucesso!');
      } else {
        console.error('Erro ao cadastrar notícia:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao cadastrar notícia:', error.message);
    }
  };

  const updateNoticia = async (id, data) => {
    try {
      const response = await fetch(`/noticia/put/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
      });
      if (response.ok) {
        console.log('Notícia atualizada com sucesso!');
      } else {
        console.error('Erro ao atualizar notícia:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao atualizar notícia:', error.message);
    }
  };

  const handleCancelar = () => {
    // Redirecionar para a lista de notícias caso o usuário cancele
    window.location.href = '/listarNoticias';
  };

  return (
    <div>
      <NavigationBar />
      <div className="container">
        <h1>{editando ? 'Editar Notícia' : 'Cadastro de Notícia'}</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="titulo">Título:</label>
            <input type="text" id="titulo" name="titulo" value={formData.titulo} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor='tribuna'>Tribuna </label>
            <MultiSelect options={selectTribuna()} set={setTribuna} /> 
          </div>
          <div className="form-group">
            <label htmlFor="conteudo">Conteúdo:</label>
            <textarea id="conteudo" name="conteudo" value={formData.conteudo} onChange={handleChange}></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="dataPublicacao">Data de Publicação:</label>
            <input type="date" id="dataPublicacao" name="dataPublicacao" value={formData.dataPublicacao} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="cidade">Cidade:</label>
            <input type="text" id="cidade" name="cidade" value={formData.cidade} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="estado">Estado:</label>
            <input type="text" id="estado" name="estado" value={formData.estado} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="bairro">Bairro:</label>
            <input type="text" id="bairro" name="bairro" value={formData.bairro} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="candidato">Candidato:</label>
            <input type="text" id="candidato" name="candidato" value={formData.candidato} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="imagem">Imagem:</label>
            <input type="text" id="imagem" name="imagem" value={formData.imagem} onChange={handleChange} />
          </div>
          <div className="button-group">
            <button type="submit" className="edit-button">{editando ? 'Salvar' : 'Enviar'}</button>
            <button type="button" onClick={handleCancelar} className="cancel-button">Cancelar</button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default CadastroNoticia;
