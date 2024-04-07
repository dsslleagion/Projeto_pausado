import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Swal from 'sweetalert2'; // Importando o SweetAlert2
import './Login.css';

const Login = () => {
  const { login } = useAuth();
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
    if (!formData.email || !formData.password) {
      // Verificar se os campos de email e senha estão vazios
      Swal.fire({
        icon: 'error',
        title: 'Campos vazios',
        text: 'Por favor, preencha todos os campos antes de fazer login.'
      });
      return;
    }
    try {
      await login(formData.email, formData.password);
      // Redirecionar para a página após o login bem-sucedido
      Swal.fire({
        icon: 'success',
        title: 'Login bem-sucedido!',
        text: 'Usuário logado com sucesso.'
      }).then(() => {
        // Redirecionar para a home após fechar o SweetAlert
        window.location.href = '/';
      });
    } catch (error) {
      console.error('Erro ao fazer login:', error.message);
      // Exibindo um alerta de erro com o SweetAlert2
      if (error.response && error.response.data.error === 'Dados de login não conferem') {
        Swal.fire({
          icon: 'error',
          title: 'Credenciais inválidas',
          text: 'Verifique seu email e senha e tente novamente.'
        });
      } else {
        // Outro tipo de erro
        Swal.fire({
          icon: 'error',
          title: 'Erro ao fazer login',
          text: 'Ocorreu um erro ao fazer login. Por favor, tente novamente mais tarde.'
        });
      }
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