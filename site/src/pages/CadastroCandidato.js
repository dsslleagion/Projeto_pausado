import React, { useState, useEffect, useRef } from 'react';
import './CadastroCandidato.css';
import NavigationBar from '../components/NavigationBar';
import Footer from '../components/Footer';
import lapis from '../assets/lapis.png' 
import lixeira from '../assets/lixeira.png' 
import {  ModalChildren } from '../components/Modal';
import { Tabela } from '../components/Tabela';
import perfil from '../assets/perfil-sem-foto.png' 
import { upload } from '../supabase/upload'


const CadastroCandidato = () => {
  const [formValues, setFormValues] = useState({
    id: '',
    nome: '',
    partido: '',
    cargoPretendido: '',
    biografia: '',
    imagem: ''
  });

  const [candidatos, setCandidatos] = useState([]);
  const [avatarSRC, setAvatarSRC] = useState('')
  const [icone, setIcone] = useState()
  const inputFile = useRef(null)


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const up =  await upload(formValues.nome, icone, 'candidatos')
      console.log(up);
      const response = await fetch('http://localhost:3001/candidato/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({nome: formValues.nome, 
        partido: formValues.partido,
        cargoPretendido: formValues.cargoPretendido,
        biografia: formValues.biografia,
        imagem: up})
      });
      if (!response.ok) {
        throw new Error('Erro ao cadastrar candidato');
      }
      setFormValues({
        id: '',
        nome: '',
        partido: '',
        cargoPretendido: '',
        biografia: '',
        imagem: "",
      });
      setAvatarSRC('')
      setIcone('')
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
      cargoPretendido: candidato.cargoPretendido,
      biografia: candidato.biografia
    });
    setAvatarSRC(candidato.imagem)
    setIcone(candidato.imagem)
  };

  console.log(icone);
  console.log(avatarSRC);

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      if(icone !== avatarSRC){
        const up =  await upload(formValues.nome, icone, 'candidatos')
        const response = await fetch(`http://localhost:3001/candidato/put/${formValues.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({nome: formValues.nome, 
          partido: formValues.partido,
          cargoPretendido: formValues.cargoPretendido,
          biografia: formValues.biografia,
          imagem: up})
        });
        if (!response.ok) {
          throw new Error('Erro ao atualizar candidato');
        }
      }
      else{
        const response = await fetch(`http://localhost:3001/candidato/put/${formValues.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({nome: formValues.nome, 
          partido: formValues.partido,
          cargoPretendido: formValues.cargoPretendido,
          biografia: formValues.biografia,
          imagem: icone})
        });
        if (!response.ok) {
          throw new Error('Erro ao atualizar candidato');
        }
      }
      setFormValues({
        id: '',
        nome: '',
        partido: '',
        cargoPretendido: '',
        biografia: '',
        imagem: ''
      });
      setAvatarSRC('')
      setIcone('')
      fetchCandidatos();
    } catch (error) {
      console.error('Erro ao atualizar candidato:', error);
    }
  };

  const onChangeInputFile = (e) =>{
    const files = e.target.files;
    
    if (FileReader && files && files.length > 0) {
      const file = files[0] 
    console.log(files);

      var fr = new FileReader();
      fr.onload = function () {
        if(fr.result){
          setAvatarSRC(fr.result.toString())
          setIcone(files)
        }        
      }           
      fr.readAsDataURL(file);
    }
  }

 

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
                <div
                  className='d-flex align-items-center justify-content-center'
                >
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
            <button type="submit">{formValues.id ? 'Alterar' : 'Cadastrar'}</button>
          </form>
          <h2>Candidatos Cadastrados</h2>
          <Tabela th={
            <>
              <th className="text-center">Nome </th><th className="text-center">Partido</th>
              <th className="text-center">Cargo Pretendido</th>
              <th className="text-center">Ações</th>
            </>
          }>
                {candidatos.map((candidato) => (
                    <tr key={candidato.id} className="dropdown-label anexo">
                      {/*corpo tabela*/}
                   
                      <td className="text-center">{candidato.nome}</td>
                      <td className="text-center">{candidato.partido}</td>
                      <td className="text-center">{candidato.cargoPretendido}</td>
                      <td className="text-center">
                        
                      <img src={lapis} alt='editar' style={{ width: "30px", padding: "3px" }} onClick={() => handleEdit(candidato)}/>
                      <img src={lixeira} alt='deletar' style={{ width: "30px", padding: "3px" }} onClick={() => handleDelete(candidato.id)}/>
                        <ModalChildren image={perfil}>
                          <h1 style={{textAlign: 'center'}}>{candidato.nome}</h1>
                          <p>Partido: {candidato.partido}</p>
                          <p>Cargo: {candidato.cargoPretendido}</p>
                          <img
                            className="rounded-circle"
                            src={candidato.imagem}
                            alt="avatar"
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }} // Ajuste o estilo conforme necessário
                          />
                          <p>Biografia: {candidato.biografia}</p>
                        </ModalChildren>
                      
                      </td>
                    </tr>
                  ))}
          </Tabela>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CadastroCandidato;
