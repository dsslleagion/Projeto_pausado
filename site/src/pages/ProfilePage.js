import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import './ProfilePage.css'; // Arquivo de estilos CSS
import NavigationBar from '../components/NavigationBar';
import Footer from '../components/Footer';

const ProfilePage = () => {
  const { userData, updateUserData } = useAuth(); // Obtém os dados do usuário autenticado e a função para atualizar os dados
  const [formData, setFormData] = useState({
    nome: userData.nome,
    email: userData.email,
    sexo: userData.sexo,
    telefone: userData.telefone,
    bairro: userData.bairro,
    endereco: userData.endereco,
    cidade: userData.cidade,
    cep: userData.cep,
    redes_sociais: userData.redes_sociais,
    password: '', // Adicionei um campo de senha para permitir a atualização da senha
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Chame a função para atualizar os dados do usuário com os novos dados do formulário
    updateUserData(formData);
    // Limpe o formulário após a atualização bem-sucedida
    setFormData({ ...formData, password: '' });
  };

  return (
    <div>
        <NavigationBar></NavigationBar>
    <div className="profile-container">
      <h1>Perfil do Usuário</h1>
      <form className="profile-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nome:</label>
          <input type="text" name="nome" value={formData.nome} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Sexo:</label>
          <input type="text" name="sexo" value={formData.sexo} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Telefone:</label>
          <input type="tel" name="telefone" value={formData.telefone} onChange={handleChange} />
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
        <button type="submit">Atualizar Dados</button>
      </form>
    </div>
    <Footer></Footer>
    </div>
  );
};

export default ProfilePage;
