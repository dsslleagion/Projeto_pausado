import React, { useState, useEffect } from 'react';
import NavigationBar from '../components/NavigationBar';
import Button from '../components/Button';
import './Cadastro.css';
import Footer from '../components/Footer';

const CadastroUsuarios = () => {
  const [formValues, setFormValues] = useState({
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
    profile: 'user' // Definindo o perfil como "user" por padrão
  });
  const [usuarios, setUsuarios] = useState([]);
  const [editandoUsuario, setEditandoUsuario] = useState(null); // Variável para controlar se está editando um usuário

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editandoUsuario) {
        // Se estiver editando um usuário, chame a função de atualizar
        await atualizarUsuario(editandoUsuario.id, formValues);
      } else {
        // Se não estiver editando um usuário, chame a função de criar
        await cadastrarUsuario(formValues);
      }
      // Limpar o formulário após o envio bem-sucedido
      setFormValues({
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
        profile: 'user'
      });
      setEditandoUsuario(null); // Limpar o estado de edição
    } catch (error) {
      console.error('Erro ao cadastrar/atualizar usuário:', error.message);
    }
  };

  const fetchUsuarios = async () => {
    try {
      const response = await fetch('http://localhost:3001/cliente/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        }
      });
      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data)) {
          setUsuarios(data);
        } else {
          console.error('Erro ao buscar usuários: a resposta não é uma matriz.');
        }
      } else {
        console.error('Erro ao buscar usuários:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao buscar usuários:', error.message);
    }
  };
  

  const handleExcluirUsuario = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/cliente/delete/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        console.log('Usuário excluído com sucesso!');
        // Recarregar a lista de usuários após excluir
        fetchUsuarios();
      } else {
        console.error('Erro ao excluir usuário:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao excluir usuário:', error.message);
    }
  };

  const handleEditarUsuario = (usuario) => {
    // Preencher o formulário com os dados do usuário selecionado
    setFormValues({ ...usuario });
    setEditandoUsuario(usuario); // Atualizar o estado para indicar que está editando um usuário
    // Aqui você pode adicionar a lógica para editar o usuário
    console.log('Editar usuário:', usuario);
  };

  const cadastrarUsuario = async (data) => {
    try {
      const response = await fetch('http://localhost:3001/cliente/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
      });
      if (response.ok) {
        console.log('Usuário cadastrado com sucesso!');
        // Recarregar a lista de usuários após cadastrar um novo
        fetchUsuarios();
      } else {
        console.error('Erro ao cadastrar usuário:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error.message);
    }
  };

  const atualizarUsuario = async (id, data) => {
    try {
      const response = await fetch(`http://localhost:3001/cliente/modify/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
      });
      if (response.ok) {
        console.log('Usuário atualizado com sucesso!');
        // Recarregar a lista de usuários após atualizar
        fetchUsuarios();
      } else {
        console.error('Erro ao atualizar usuário:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error.message);
    }
  };

  return (
    <div>
      <NavigationBar />
      <div className="container">
        <h1 className="title">Cadastro de Usuários</h1>
        <form onSubmit={handleSubmit} className="form">
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
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formValues.email}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="sexo">Sexo:</label>
            <select
              id="sexo"
              name="sexo"
              value={formValues.sexo}
              onChange={handleChange}
            >
              <option value="">Selecione</option>
              <option value="masculino">Masculino</option>
              <option value="feminino">Feminino</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="telefone">Telefone:</label>
            <input
              type="text"
              id="telefone"
              name="telefone"
              value={formValues.telefone}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="bairro">Bairro:</label>
            <input
              type="text"
              id="bairro"
              name="bairro"
              value={formValues.bairro}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="endereco">Endereço:</label>
            <input
              type="text"
              id="endereco"
              name="endereco"
              value={formValues.endereco}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="cidade">Cidade:</label>
            <input
              type="text"
              id="cidade"
              name="cidade"
              value={formValues.cidade}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="cep">CEP:</label>
            <input
              type="text"
              id="cep"
              name="cep"
              value={formValues.cep}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="redes_sociais">Rede Social Mais Utilizada:</label>
            <select
              id="redes_sociais"
              name="redes_sociais"
              value={formValues.redes_sociais}
              onChange={handleChange}
            >
              <option value="">Selecione</option>
              <option value="facebook">Facebook</option>
              <option value="twitter">Twitter</option>
              <option value="instagram">Instagram</option>
              <option value="linkedin">LinkedIn</option>
              {/* Adicione mais opções conforme necessário */}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="password">Senha:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formValues.password}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="profile">Perfil:</label>
            <select
              id="profile"
              name="profile"
              value={formValues.profile}
              onChange={handleChange}
            >
              <option value="user">Usuário</option>
              <option value="adm">Administrador</option>
            </select>
          </div>
          <Button type="submit" text="Cadastrar" />
        </form>

        <h2>Usuários</h2>
        <div className="usuarios-container">
          {usuarios.map((usuario) => (
            <div className="usuario-card" key={usuario.id}>
              <strong>{usuario.nome}</strong>
              <p>{usuario.email}</p>
              <div className="buttons-container">
                <button onClick={() => handleEditarUsuario(usuario)} className="edit-button">Editar</button>
                <button onClick={() => handleExcluirUsuario(usuario.id)} className="delete-button">Excluir</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CadastroUsuarios;
