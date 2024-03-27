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
import TribunasPage from './pages/TribunasPage';
import ViewForum from './pages/ViewForum';
import CadastroForum from './pages/CadastroForum';
import { Provider } from './contexts/TribunaContext'
import { ProviderCandidato } from './contexts/CandidatoContext';
import CadastroTribunas from './pages/CadastroTribunas';
import NoticiaPage from './pages/NoticiaPage';
import ListagemTribunas from './pages/ListagemTribunas';
import ListagemForum from './pages/ListagemForum';

function App() {
  return (
    <Router>
      <AuthProvider>
        <ProviderCandidato> {/* Envolve a aplicação com o AuthProvider */}
          <Provider>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cadastro" element={<Cadastro />} />
              <Route path="/cadastroAdm" element={<CadastroAdm />} />
              <Route path="/tribunas" element={<TribunasPage />} />
              <Route path="/listagemTribunas" element={<ListagemTribunas />} />
              <Route path="/listagemforum" element={<ListagemForum />} />
              <Route path="/cadastroTri" element={<CadastroTribunas />} />
              <Route path="/cadastroTri/:id" element={<CadastroTribunas />} />
              <Route path="/cadastroJornal" element={<CadastroJornal />} />
              <Route path="/CadastroTribunas" element={<CadastroTribunas />} />
              <Route path="/cadastroCandidato" element={<CadastroCandidato />} />
              <Route path="/CadastroForum" element={<CadastroForum />} />
              <Route path="/CadastroForum/:id" element={<CadastroForum />} />
              <Route path="/candidatos" element={<CandidatoPage />} />
              <Route path="/jornal" element={<JornalPage />} />
              <Route path="/CandidatoPage/:id" element={<CandidatoPage />} />
              <Route path="/NoticiaPage/:id" element={<NoticiaPage />} />
              <Route path="/perfil" element={<ProfilePage />} />
              <Route path="/cadastroNoticia" element={<CadastroNoticia />} />
              <Route path="/login" element={<Login />} /> {/* Adiciona a rota para a página de login */}
              <Route path="/viewforum" element={<ViewForum />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Provider>
        </ProviderCandidato>
      </AuthProvider>
    </Router>
  );
}

export default App;
