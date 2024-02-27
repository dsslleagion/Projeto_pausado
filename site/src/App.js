import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Cadastro from './pages/Cadastro';
import Login from './pages/Login'; // Importe a página de Login
import { AuthProvider } from './contexts/AuthContext'; // Importe o AuthProvider
import CadastroNoticia from './pages/CadastroNoticia';
import JornalPage from './pages/JornalPage';
import ProfilePage from './pages/ProfilePage';
import CadastroAdm from './pages/CadastroAdm';
import CadastroJornal from './pages/CadastroJornal';
import CadastroCandidato from './pages/CadastroCandidato';
import CandidatoPage from './pages/CandidatoPage';
import CandidatosPage from './pages/CandidatosPage';
import TribunasPage from './pages/TribunasPage';
import EducaçãoTribunaPage from './pages/EducaçãoTribunaPage';
import SaúdeTribunaPage from './pages/SaúdeTribunaPage';

function App() {
  return (
    <Router>
      <AuthProvider> {/* Envolve a aplicação com o AuthProvider */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/cadastroAdm" element={<CadastroAdm />} />
          <Route path="/tribunas" element={<TribunasPage />} />
          <Route path="/tribuna/educacao" element={<EducaçãoTribunaPage />} />
          <Route path="/tribuna/saude" element={<SaúdeTribunaPage />} />
          <Route path="/cadastroJornal" element={<CadastroJornal />} />
          <Route path="/cadastroCandidato" element={<CadastroCandidato />} />
          <Route path="/candidato" element={<CandidatoPage />} />
          <Route path="/candidatosPage" element={<CandidatosPage />} />
          <Route path="/jornal" element={<JornalPage />} />
          <Route path="/perfil" element={<ProfilePage />} />
          <Route path="/cadastroNoticia" element={<CadastroNoticia />} />
          <Route path="/login" element={<Login />} /> {/* Adiciona a rota para a página de login */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
