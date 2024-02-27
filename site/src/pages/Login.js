import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Login.css';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate(); // Hook para navegação programática
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Chamar a função de login com email e senha
      await login(formData.email, formData.password);

      // Redirecionar para a página após o login bem-sucedido
      navigate('/');

    } catch (error) {
      console.error('Erro ao fazer login:', error.message);
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </div>
        <div>
          <label>Senha:</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} />
        </div>
        <button type="submit">Entrar</button>
      </form>
      <p>Ainda não tem uma conta? <Link to="/cadastro">Cadastre-se aqui</Link></p>
    </div>
  );
};

export default Login;
