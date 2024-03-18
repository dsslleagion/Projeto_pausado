import React, { useState, useEffect } from 'react';
import NavigationBar from '../components/NavigationBar';
import Button from '../components/Button';
import './CadastroJornal.css';
import Footer from '../components/Footer';

const CadastroJornal = () => {
  const [formValues, setFormValues] = useState({
    id: null,
    titulo: '',
    conteudo: '',
    dataPublicacao: new Date().toISOString()
  });
  const [jornais, setJornais] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchJornais();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = isEditing ? `http://localhost:3001/jornal/put/${formValues.id}` : 'http://localhost:3001/jornal/post';
      const method = isEditing ? 'PUT' : 'POST';
      const response = await fetch(endpoint, {
        method: method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formValues)
      });
      if (response.ok) {
        console.log(`Jornal ${isEditing ? 'editado' : 'cadastrado'} com sucesso!`);
        setFormValues({
          id: null,
          titulo: '',
          conteudo: '',
          dataPublicacao: new Date().toISOString()
        });
        setIsEditing(false);
        fetchJornais(); // Atualiza a lista após o cadastro/edição
      } else {
        console.error(`Erro ao ${isEditing ? 'editar' : 'cadastrar'} jornal:`, response.statusText);
      }
    } catch (error) {
      console.error(`Erro ao ${isEditing ? 'editar' : 'cadastrar'} jornal:`, error);
    }
  };

  const fetchJornais = async () => {
    try {
      const response = await fetch('http://localhost:3001/jornal/all');
      if (response.ok) {
        const data = await response.json();
        setJornais(data);
      } else {
        console.error('Erro ao buscar jornais:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao buscar jornais:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/jornal/delete/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        console.log('Jornal excluído com sucesso!');
        fetchJornais(); // Atualiza a lista após a exclusão
      } else {
        console.error('Erro ao excluir jornal:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao excluir jornal:', error);
    }
  };

  const handleEdit = (jornal) => {
    setFormValues(jornal);
    setIsEditing(true);
  };

  return (
    <div>
      <NavigationBar />
      <div className='conteiner'>
        <div className="jornal-page">
          <div className="jornal-content">
            <h1>{isEditing ? 'Editar Jornal' : 'Cadastro de Jornal'}</h1>
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
                <label htmlFor="conteudo">Conteúdo:</label>
                <textarea
                  id="conteudo"
                  name="conteudo"
                  value={formValues.conteudo}
                  onChange={handleChange}
                ></textarea>
              </div>
              <Button type="submit" text={isEditing ? 'Editar' : 'Cadastrar'} />
            </form>
            <h2>Lista de Jornais</h2>
            <ul>
            {jornais.map((jornal) => (
              <li key={jornal.id}>
                {jornal.titulo}
                <button onClick={() => handleDelete(jornal.id)}>Excluir</button>
                <button onClick={() => handleEdit(jornal)}>Editar</button>
              </li>
            ))}
          </ul>
          </div>          
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default CadastroJornal;
