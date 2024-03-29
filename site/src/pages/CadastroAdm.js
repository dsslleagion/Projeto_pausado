import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import './ProfilePage.css'; // Arquivo de estilos CSS
import NavigationBar from '../components/NavigationBar';
import Footer from '../components/Footer';
import { useContextoTribuna } from '../hooks'
import Checkboxes from '../components/Checkbox';
import { useContextoCandidato } from '../hooks';
import { ModalChildren, ModalComponent } from '../components/Modal';
import lapis from '../assets/lapis.png' 
import { upload } from '../supabase/upload';
import { useParams } from 'react-router-dom';

const CadastroAdm = () => {
  const { id } = useParams();
  const { userData, updateUserData, getClienteById } = useAuth();
  const { candidato } = useContextoCandidato();
  const [candidatosUsa, setCandidatosUsa] = useState([]);
  const [novosCandidatos, setNovosCandidatos] = useState([]);
  const { tribuna } = useContextoTribuna();
  const [tribunasUsa, setTribunasUsa] = useState([]);
  const [novasTribunas, setNovasTribunas] = useState([]);
  const [formData, setFormData] = useState({
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
    passwordRep: '',
    imagem: ''
  });
  const [avatarSRC, setAvatarSRC] = useState('')
  const [icone, setIcone] = useState()
  const inputFile = useRef(null)

  const isChecked = (lista1, lista2) => {
    lista1.forEach((item1) => {
      const encontrado = lista2.some((item2) => item1.id === item2.tribuna.id);
      const idjunt = lista2.find((item3) => item3.tribuna.id === item1.id);
      item1.checked = encontrado;
      if (idjunt !== undefined) {
        item1.idjunt = idjunt.id;
      } else {
        item1.idjunt = -1;
      }
    });
    return lista1;
  };
  const isChecked2 = (lista1, lista2) => {
    lista1.forEach((item1) => {
      const encontrado = lista2.some((item2) => item1.id === item2.candidato.id);
      const idjunt = lista2.find((item3) => item3.candidato.id === item1.id);
      item1.checked = encontrado;
      if (idjunt !== undefined) {
        item1.idjunt = idjunt.id;
      } else {
        item1.idjunt = -1;
      }
    });
    return lista1;
  };

  const handleCheckboxChange = (id, idjunt, set) => {
    set((prevTribunas) => {
      const exists = prevTribunas.find((item) => item.id === id);
      if (!exists) {
        return [...prevTribunas, { id: Number(id), idjunt: idjunt }];
      }
      return prevTribunas.filter((item) => item.id !== id);
    });
  };


  useEffect(() => {
    const fetchClienteData = async () => {
      try {
        const response = await fetch(`http://localhost:3001/cliente/specific/${id}`); // Use a rota específica para buscar os dados do usuário por ID
        if (response.ok) {
          const clienteData = await response.json();
          setFormData(clienteData);
          setAvatarSRC(clienteData.imagem)
        } else {
          console.error('Erro ao buscar dados do cliente:', response.statusText);
        }
      } catch (error) {
        console.error('Erro ao buscar dados do cliente:', error);
      }
    };

    setTribunasUsa(isChecked(tribuna, userData.tribunas));
    setCandidatosUsa(isChecked2(candidato, userData.candidatos));
    
    fetchClienteData();
  }, [id, tribuna, candidato, userData.tribunas, userData.candidatos]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const tribunasCD = async () => {
    try {
      novasTribunas.map(async (tri) => {
        if (tri.idjunt === -1) {
          const response = await fetch('http://localhost:3001/ct/post', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify({ cliente: userData.cliente.id, tribuna: tri.id }),
          });
          if (response.ok) {
            logout();
            console.log('Usuário cadastrado com sucesso!');
          } else {
            console.error('Erro ao cadastrar usuário:', response.statusText);
          }
        } else {
          const response = await fetch(`http://localhost:3001/ct/delete/${tri.idjunt}`, {
            method: 'DELETE',
          });
          if (response.ok) {
            logout();
            console.log('Usuário excluído com sucesso!');
          } else {
            console.error('Erro ao excluir usuário:', response.statusText);
          }
        }
      });
      const response = await fetch(`http://localhost:3001/ct/allTri/${userData.cliente.id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
      });
      const trib = await response.json();
      updateUserData({ ...userData, cliente: formData, tribunas: trib });
      logout(); // Chama o logout após a atualização
    } catch (err) { }
  };

  const candidatosCD = async () => {
    try {
      novosCandidatos.map(async (can) => {
        if (can.idjunt === -1) {
          const response = await fetch('http://localhost:3001/cc/post', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify({ cliente: userData.cliente.id, candidato: can.id }),
          });
          if (response.ok) {
            logout();
            console.log('Usuário cadastrado com sucesso!');
          } else {
            console.error('Erro ao cadastrar usuário:', response.statusText);
          }
        } else {
          const response = await fetch(`http://localhost:3001/cc/delete/${can.idjunt}`, {
            method: 'DELETE',
          });
          if (response.ok) {
            logout();
            console.log('Usuário excluído com sucesso!');
          } else {
            console.error('Erro ao excluir usuário:', response.statusText);
          }
        }
      });
      const response = await fetch(`http://localhost:3001/cc/allCan/${userData.cliente.id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
      });
      const canb = await response.json();
      updateUserData({ ...userData, cliente: formData, candidatos: canb });
      logout(); // Chama o logout após a atualização
    } catch (err) { }
  };

  const handleUpdatePassword = async () => {
    try {
      if(formData.password === formData.passwordRep && formData.password !== null && formData.password !== undefined){
        const response = await fetch(`/cliente/modifypassword/${userData.cliente.userEmail}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ password: formData.password }),
        });
        if (response.ok) {
          alert('Senha atualizada com sucesso!');
          setFormData({ ...formData, password: '' });
          logout(); // Chama o logout após a atualização
        } else {
          alert('Erro ao atualizar a senha. Tente novamente mais tarde.');
        }
      }
      else{
        alert('A senha e o repetir senha tem que ser iguais!')
      }

    } catch (error) {
      console.error('Erro ao atualizar a senha:', error);
      alert('Erro ao atualizar a senha. Tente novamente mais tarde.');
    }
  };

  const handleUpdateClientData = async () => {
    try {
      if(icone !== undefined){
        const up =  await upload(formData.nome, icone, 'usuarios')
        const response = await fetch(`/cliente/modify/${userData.cliente.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            nome: formData.nome,
            email: formData.email,
            sexo: formData.sexo,
            telefone: formData.telefone,
            bairro: formData.bairro,
            endereco: formData.endereco,
            cidade: formData.cidade,
            cep: formData.cep,
            redes_sociais: formData.redes_sociais,
            password: formData.password,
            profile: formData.profile,
            imagem: up,
          }),
        });
  
        if (response.ok) {
  
          alert('Dados do cliente atualizados com sucesso!');
          logout();
  
          const updatedUserData = { ...userData, cliente: formData };
          updateUserData(updatedUserData);
          // Chama o logout após a atualização
          logout();
        }
      }
      const response = await fetch(`/cliente/modify/${userData.cliente.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome: formData.nome,
          email: formData.email,
          sexo: formData.sexo,
          telefone: formData.telefone,
          bairro: formData.bairro,
          endereco: formData.endereco,
          cidade: formData.cidade,
          cep: formData.cep,
          redes_sociais: formData.redes_sociais,
          password: formData.password,
          profile: formData.profile,
          imagem: formData.imagem,
        }),
      });

      if (response.ok) {

        alert('Dados do cliente atualizados com sucesso!');
        logout();

        const updatedUserData = { ...userData, cliente: formData };
        updateUserData(updatedUserData);
        // Chama o logout após a atualização
        logout();
      } else {

      }
    } catch (error) {

    }
  };
console.log(formData);
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

  const logout = () => {
    window.location.href = "/listagemUsuarios";
  };

  return (
    <div>
      <NavigationBar />
      <div className="profile-container">

        <form className="profile-form">
          <h1>Cadastro Usuário</h1>
          <div className="form-group">
            <label>Nome:</label>
            <input type="text" name="nome" value={formData.nome} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>E-mail:</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Sexo:</label>
            <select name="sexo" value={formData.sexo} onChange={handleChange}>
              <option value="masculino">Masculino</option>
              <option value="feminino">Feminino</option>
            </select>
          </div>
          <div className="form-group">
            <label>Telefone:</label>
            <input type="text" name="telefone" value={formData.telefone} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Bairro:</label>
            <input type="text" name="bairro" value={formData.bairro} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Endereço:</label>
            <input type="text" name="endereco" value={formData.endereco} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Cidade:</label>
            <input type="text" name="cidade" value={formData.cidade} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>CEP:</label>
            <input type="text" name="cep" value={formData.cep} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Redes Sociais:</label>
            <input type="text" name="redes_sociais" value={formData.redes_sociais} onChange={handleChange} />
          </div>

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

          <h3>Tribunas interessados</h3>
          <div>
            <ModalChildren image={lapis}>
              <h1>Tribunas interessados</h1>
              {tribunasUsa.map((res) =>
                <div>
                  <Checkboxes value={res.id} isChecked={res.checked} onChange={(e) => handleCheckboxChange(e, res.idjunt, setNovasTribunas)} />
                  <p>{res.nome}</p>
                </div>
              )}
              <button type="button" onClick={tribunasCD}>Atualizar tribunas</button>
            </ModalChildren>
            
          </div>
          <h3>Candidatos interessados</h3>
          <div>
            <ModalChildren image={lapis}>
              <h1>Candidatos interessados</h1>
              {candidatosUsa.map((res) =>
                <div>
                  <Checkboxes value={res.id} isChecked={res.checked} onChange={(e) => handleCheckboxChange(e, res.idjunt, setNovosCandidatos)} />
                  <p>{res.nome}</p>
                </div>
              )}
              <button type="button" onClick={candidatosCD}>Atualizar candidatos</button>
            </ModalChildren>
            
          </div>
          <button type="button" onClick={handleUpdateClientData}>Atualizar Dados do Cliente</button>
          {/* <button type="button" onClick={handleUpdatePassword}>Atualizar Senha</button> */}
          <ModalComponent title={'Atualizar Senha'}>
              <h1>Atualizar Senha</h1>
              <div className="form-group">
                <label>Nova Senha:</label>
                <input type="password" name="password" value={formData.password} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Repetir Senha:</label>
                <input type="password" name="passwordRep" value={formData.passwordRep} onChange={handleChange} />
              </div>
              <button type="button" onClick={handleUpdatePassword}>Atualizar Senha</button>
          </ModalComponent>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default CadastroAdm;
