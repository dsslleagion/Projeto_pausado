import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import './ProfilePage.css'; // Arquivo de estilos CSS
import NavigationBar from '../components/NavigationBar';
import Footer from '../components/Footer';
import { useContextoTribuna } from '../hooks'
import Checkboxes  from '../components/Checkbox';

const ProfilePage = () => {
  const { userData, updateUserData, getClienteById} = useAuth();
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
  });

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

  const handleCheckboxChange = (id, idjunt) => {
    setNovasTribunas((prevTribunas) => {
      const exists = prevTribunas.find((item) => item.id === id);
      if (!exists) {
        return [...prevTribunas, { id: Number(id), idjunt: idjunt }];
      }
      return prevTribunas.filter((item) => item.id !== id);
    });
  };

  useEffect(() => {
    setTribunasUsa(isChecked(tribuna, userData.tribunas));
    const fetchClienteData = async () => {
      try {
        const clienteData = await getClienteById(userData.cliente.id);
        setFormData(clienteData);
      } catch (error) {
        console.error('Erro ao buscar dados do cliente:', error);
      }
    };
    fetchClienteData();
  }, [userData.cliente.id, getClienteById, tribunasUsa, tribuna]);

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
    } catch (err) {}
  };

  const handleUpdatePassword = async () => {
    try {
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
      } else {
        alert('Erro ao atualizar a senha. Tente novamente mais tarde.');
      }
    } catch (error) {
      console.error('Erro ao atualizar a senha:', error);
      alert('Erro ao atualizar a senha. Tente novamente mais tarde.');
    }
    logout(); // Chama o logout após a atualização
  };

  const handleUpdateClientData = async () => {
    try {
      const response = await fetch(`/cliente/modify/${userData.cliente.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
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
  
  
  
  const logout = () => {
    localStorage.removeItem('userData');
    // setUserData({ token: null, cliente: null });
    window.location.href = "/login";
  };

  return (
    <div>
      <NavigationBar />
      <div className="profile-container">
        <h1>Perfil do Usuário</h1>
        <form className="profile-form">
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
          <div className="form-group">
            <label>Nova Senha:</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} />
          </div>
          <div>
            {tribunasUsa.map((res) => 
              <div>
                <Checkboxes value={res.id} isChecked={res.checked} onChange={(e) => handleCheckboxChange(e, res.idjunt)}/> 
                <p>{res.nome}</p> 
              </div>
            )}
          </div>
          <button type="button" onClick={handleUpdateClientData}>Atualizar Dados do Cliente</button>
          <button type="button" onClick={tribunasCD}>Atualizar Dados de interreses</button>
          <button type="button" onClick={handleUpdatePassword}>Atualizar Senha</button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default ProfilePage;
