import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import './ProfilePage.css'; // Arquivo de estilos CSS
import NavigationBar from '../components/NavigationBar';
import Footer from '../components/Footer';

const ProfilePage = () => {
  const { userData, updateUserData, getClienteById } = useAuth();
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

  useEffect(() => {
    const fetchClienteData = async () => {
      try {
        const clienteData = await getClienteById(userData.cliente.id);
        setFormData(clienteData);
      } catch (error) {
        console.error('Erro ao buscar dados do cliente:', error);
      }
    };

    fetchClienteData();
  }, [userData.cliente.id, getClienteById]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdateData = async () => {
    try {
      const response = await fetch(`/cliente/modify/${userData.cliente.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        updateUserData({ ...userData, cliente: formData });
        alert('Dados atualizados com sucesso!');
      } else {
        alert('Erro ao atualizar os dados. Tente novamente mais tarde.');
      }
    } catch (error) {
      console.error('Erro ao atualizar dados:', error);
      alert('Erro ao atualizar os dados. Tente novamente mais tarde.');
    }
  };

  const handleUpdatePassword = async () => {
    try {
      const response = await fetch(`/cliente/modifypassword/${userData.cliente.id}`, {
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
          <button type="button" onClick={handleUpdateData}>Atualizar Dados</button>
          <button type="button" onClick={handleUpdatePassword}>Atualizar Senha</button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default ProfilePage;
