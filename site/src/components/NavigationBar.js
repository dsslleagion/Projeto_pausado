import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import logo from '../assets/logoccv.png';
import profilePic from '../assets/perfil-sem-foto.png'; // Importe uma imagem de perfil fictícia
import './NavigationBar.css';


const NavigationBar = () => {
  const { userData, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();


  // Verificar se o usuário está autenticado de forma segura
  const isAuthenticated = userData && userData.token;
  // Verificar se o usuário é admin
  const isAdmin = isAuthenticated && userData.cliente && userData.cliente.profile === 'admin';
  // Verificar se o usuário é do tipo "user"
  const isUser = isAuthenticated && userData.cliente && userData.cliente.profile === 'user';

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const activateDropdown = (category) => {
    const categoryElement = document.querySelector(`.${category}`);
    categoryElement.classList.toggle('active');
  };

  const isCadastroPage = location.pathname === '/cadastro';

  return (
    <nav className="nav-container">
      <div className="nav-left">
        <Link to="/" className="logo-link">
          <img src={logo} alt="Logo" className="logo-img" />
        </Link>
        
      </div>
      <div className="nav-right">
        {!isAuthenticated && !isCadastroPage && (
          <>
            <Link to="/cadastro" className="nav-button">
              Criar Cadastro
            </Link>
            <Link to="/login" className="nav-button">
              Fazer Login
            </Link>
          </>
        )}
        {!isAuthenticated && isCadastroPage && (
          <>
            <Link to="/login" className="nav-button">
              Fazer Login
            </Link>
          </>
        )}
        {isAuthenticated && (
          <>
            {isAdmin && (
              <div className="nav-category" onClick={() => activateDropdown('dropdown-cadastro')}>
                <span className="nav-category-title">Cadastros</span>
                <div className="dropdown-content dropdown-cadastro">
                  <Link to="/cadastroNoticia" className="nav-link"> Notícias</Link>
                  <Link to="/cadastroJornal" className="nav-link"> Jornal</Link>
                  <Link to="/cadastroAdm" className="nav-link"> Usuário</Link>
                  <Link to="/cadastroCandidato" className="nav-link"> Candidato</Link>
                </div>
              </div>
            )}
            <div className="nav-category" onClick={() => activateDropdown('dropdown-jornal')}>
              <span className="nav-category-title">Forum</span>
              <div className="dropdown-content dropdown-jornal">
                <Link to="/Jornal" className="nav-link">Reclame aqui</Link>
                <Link to="/Jornal" className="nav-link">Veja as principais reclamações</Link>              
              </div>
            </div>
            <div className="nav-category" onClick={() => activateDropdown('dropdown-jornal')}>
              <span className="nav-category-title">Jornal</span>
              <div className="dropdown-content dropdown-jornal">
                <Link to="/Jornal" className="nav-link">Cá entre Nós</Link>                
              </div>
            </div>
            <div className="nav-category" onClick={() => activateDropdown('dropdown-candidatos')}>
              <span className="nav-category-title">Candidatos</span>
              <div className="dropdown-content dropdown-candidatos">
                <Link to="/candidatosPage" className="nav-link">Principal</Link>
              </div>
            </div>
            <div className="nav-category" onClick={() => activateDropdown('dropdown-tribunas')}>
              <span className="nav-category-title">Tribunas</span>
              <div className="dropdown-content dropdown-tribunas">
                <Link to="/tribuna/educacao" className="nav-link">Educação</Link>
                <Link to="/tribuna/saude" className="nav-link">Saúde</Link>
              </div>
            </div>
            <div className="nav-category" onMouseEnter={toggleDropdown} onMouseLeave={toggleDropdown}>
              <div className="nav-profile" onClick={toggleDropdown}>
                <img src={profilePic} alt="Perfil" className="profile-pic" />
              </div>
              {dropdownOpen && (
                <div className="dropdown-content dropdown-profile">
                  <div className="profile-dropdown">
                    <img src={profilePic} alt="Perfil" className="profile-pic-large" />
                    <div className="profile-info">
                    <p>Bem-Vindo! {userData.cliente.nome}</p>
                      <Link to="/perfil" className="nav-link">Perfil</Link>
                      <button className="nav-link" onClick={logout}>Logout</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavigationBar;
