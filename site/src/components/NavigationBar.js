import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import logo from '../assets/logoccv.png';
import profilePic from '../assets/perfil-sem-foto.png'; // Importe uma imagem de perfil fictícia
import './NavigationBar.css';


const NavigationBar = () => {
  const { userData, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showCandidatos, setShowCandidatos] = useState(false);
  const [showTribunas, setShowTribunas] = useState(false);
  const location = useLocation();


  useEffect(() => {
    if (userData && userData.cliente) {
      setShowCandidatos(userData.cliente.candidatos && userData.cliente.candidatos.length > 0);
      setShowTribunas(userData.cliente.tribunas && userData.cliente.tribunas.length > 0);
    }
  }, [userData]);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const activateDropdown = (category) => {
    const categoryElement = document.querySelector(`.${category}`);
    categoryElement.classList.toggle('active');
  };

  const renderProfileImage = () => {
    if (userData && userData.cliente && typeof userData.cliente.imagem === 'string' && userData.cliente.imagem !== '') {
      return <img src={userData.cliente.imagem} alt="Perfil" className="profile-pic" />;
    } else {
      return <img src="https://cvfggtwoyyhatnhuumla.supabase.co/storage/v1/object/public/usuarios/perfil-sem-foto.png" alt="Perfil Padrão" className="profile-pic" />;
    }
  };
  
  const isCadastroPage = location.pathname === '/cadastro';
  const isAuthenticated = userData && userData.token;
  const isAdmin = isAuthenticated && userData.cliente && userData.cliente.profile === 'admin';

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
                  <Link to="/listagemJornal" className="nav-link"> Jornal</Link>
                  <Link to="/listagemUsuarios" className="nav-link"> Usuário</Link>
                  <Link to="/listagemCandidatos" className="nav-link"> Candidato</Link>
                  <Link to="/listagemTribunas" className="nav-link"> Tribuna </Link>
                </div>
              </div>
            )}
            <div className="nav-category" onClick={() => activateDropdown('dropdown-jornal')}>
              <span className="nav-category-title">Forum</span>
              <div className="dropdown-content dropdown-jornal">
                <Link to="/ListagemForum" className="nav-link">Reclame aqui</Link>
                <Link to="/viewForum" className="nav-link">Veja as principais reclamações</Link>              
              </div>
            </div>
            <div className="nav-category" onClick={() => activateDropdown('dropdown-jornal')}>
              <span className="nav-category-title">Jornal</span>
              <div className="dropdown-content dropdown-jornal">
                <Link to="/Jornal" className="nav-link">Cá entre Nós</Link>                
              </div>
            </div>
            {/* {(isAdmin || showCandidatos) && (
               <Link to="/candidatos" className="nav-category"style={{ textDecoration: 'none' }}>
               <span className="nav-category-title">Candidatos</span>
             </Link>
            )} */}
            {/* {(isAdmin || showTribunas) && (
              <Link to="/tribunas" className="nav-category"style={{ textDecoration: 'none' }}>
              <span className="nav-category-title">Tribunas</span>
            </Link>
            )} */}
            {location.pathname !== '/perfil' && (
              <div className="nav-category" onMouseEnter={toggleDropdown} onMouseLeave={toggleDropdown}>
                <div className="nav-profile" onClick={toggleDropdown}>
                {renderProfileImage()}
                </div>
                {dropdownOpen && (
                  <div className="dropdown-content dropdown-profile">
                    <div className="profile-dropdown">
                    {renderProfileImage()}
                      <div className="profile-info">
                        <p>Bem-Vindo! {userData.cliente.nome}</p>
                        <Link to="/perfil" className="nav-link">Perfil</Link>
                        <button className="nav-link" onClick={logout}>Logout</button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </nav>
  );
};

export default NavigationBar;
