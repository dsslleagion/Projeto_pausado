import React, { useState, useEffect, useRef } from 'react';
import NavigationBar from '../components/NavigationBar';
import Button from '../components/Button';
import './CadastroJornal.css';
import Footer from '../components/Footer';
import { useParams } from 'react-router-dom';

const CadastroJornal = () => {
  const { id } = useParams();
  const [avatarSRC, setAvatarSRC] = useState('')
  const [icone, setIcone] = useState()
  const inputFile = useRef(null)
  const [formValues, setFormValues] = useState({
    titulo: '',
    conteudo: '',
    pdf_url: '', 
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

  const onChangeInputFile = (e) => {
    const files = e.target.files;

    if (files && files.length > 0) {
      const file = files[0];

      var reader = new FileReader();
      reader.onload = function () {
        setAvatarSRC(reader.result);
      };
      reader.readAsDataURL(file);
    }
    setIcone(e.target.files[0]);
  }
console.log(icone);

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
          pdf_url: '', // Resetando o campo pdf_url
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
      <NavigationBar />
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
          <div>
            <label htmlFor="pdf_url">URL do PDF:</label>
            <input
              type="text"
              id="pdf_url"
              name="pdf_url"
              value={formValues.pdf_url}
              onChange={handleChange}
            />
          </div>
          <input type="file" onChange={onChangeInputFile} />
      {avatarSRC && (
        <div>
          <iframe title='pdf' src={avatarSRC} type="application/pdf" width="100%" height="600px" />
        </div>
      )}
     
          <button type="submit">{id ? 'Editar' : 'Cadastrar'}</button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default CadastroJornal;
