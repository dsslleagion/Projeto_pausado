import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import './CadastroCandidato.css';
import NavigationBar from '../components/NavigationBar';
import Footer from '../components/Footer';
import lapis from '../assets/lapis.png';
import lixeira from '../assets/lixeira.png';
import { ModalChildren } from '../components/Modal';
import { Tabela } from '../components/Tabela';
import perfil from '../assets/perfil-sem-foto.png';
import { upload } from '../supabase/upload';

const CadastroCandidato = () => {
  const { id } = useParams();
  const inputFile = useRef(null);

  const [formValues, setFormValues] = useState({
    id: '',
    nome: '',
    partido: '',
    cargoPretendido: '',
    biografia: '',
    imagem: ''
  });

  const [avatarSRC, setAvatarSRC] = useState('');
  const [icone, setIcone] = useState('');

  useEffect(() => {
    if (id) {
      fetchCandidato();
    }
  }, [id]);

  const fetchCandidato = async () => {
    try {
      const response = await fetch(`http://localhost:3001/candidato/one/${id}`);
      if (!response.ok) {
        throw new Error('Erro ao buscar candidato');
      }
      const data = await response.json();
      setFormValues(data);
      setAvatarSRC(data.imagem);
      setIcone(data.imagem);
    } catch (error) {
      console.error('Erro ao buscar candidato:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const up = await upload(formValues.nome, icone, 'candidatos');
      const endpoint = id ? `http://localhost:3001/candidato/put/${formValues.id}` : 'http://localhost:3001/candidato/post';
      const method = id ? 'PUT' : 'POST';

      const response = await fetch(endpoint, {
        method: method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nome: formValues.nome,
          partido: formValues.partido,
          cargoPretendido: formValues.cargoPretendido,
          biografia: formValues.biografia,
          imagem: up
        })
      });

      if (!response.ok) {
        throw new Error(`Erro ao ${id ? 'atualizar' : 'cadastrar'} candidato`);
      }

      setFormValues({
        id: '',
        nome: '',
        partido: '',
        cargoPretendido: '',
        biografia: '',
        imagem: ''
      });

      setAvatarSRC('');
      setIcone('');
      
    } catch (error) {
      console.error(`Erro ao ${id ? 'atualizar' : 'cadastrar'} candidato:`, error);
    }
  };

  const onChangeInputFile = (e) => {
    const files = e.target.files;
    
    if (FileReader && files && files.length > 0) {
      const file = files[0];

      var fr = new FileReader();
      fr.onload = function () {
        if(fr.result){
          setAvatarSRC(fr.result.toString());
          setIcone(files);
        }        
      };
      fr.readAsDataURL(file);
    }
  };

  return (
    <div>
      <NavigationBar />
      <div className="container">
        <div className="cadastro-candidato">
          <h1>{id ? 'Edição de Candidato' : 'Cadastro de Candidato'}</h1>
          <form onSubmit={handleSubmit}>
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
              <label htmlFor="cargoPretendido">Cargo:</label>
              <input
                type="text"
                id="cargoPretendido"
                name="cargoPretendido"
                value={formValues.cargoPretendido}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="nome">Biografia:</label>
              <textarea id="biografia" name="biografia" value={formValues.biografia} onChange={handleChange}></textarea>
            </div>
            <div className="row">
              <div className="col-lg-5">
                <div className='d-flex align-items-center justify-content-center'>
                  <div style={{ position: 'relative', width: 190, height: 190 }}>
                    <input
                      ref={inputFile}
                      accept="image/png, image/jpeg"
                      type="file"
                      className="position-absolute opacity-0"
                      id="fileInput"
                      onChange={onChangeInputFile}
                      style={{ top: 0, left: 0, width: '100%', height: '100%', cursor: 'pointer' }}
                    />
                    <label htmlFor="fileInput" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
                      <img
                        className="rounded-circle"
                        src={avatarSRC}
                        alt="avatar"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }} // Ajuste o estilo conforme necessário
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <button type="submit">{id ? 'Editar' : 'Cadastrar'}</button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CadastroCandidato;
