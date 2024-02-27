// JornalPage.js
import React from 'react';
import './JornalPage.css';
import NavigationBar from '../components/NavigationBar';

import Footer from '../components/Footer';

const JornalPage = () => {
  return (
    <div>
    <NavigationBar />
    <div className="jornal-page">
      
      <div className="jornal-content">
        <h1>Cá entre nós</h1>
        <article className="article">
          <h2>Manchete principal</h2>
          <img src="caminho/para/imagem.jpg" alt="Manchete principal" />
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget purus in nulla pharetra tincidunt. Proin consectetur felis ut tellus ultricies, eget suscipit libero varius. Integer tempus, urna a tincidunt finibus, mauris elit tempor est, nec cursus orci sapien at ipsum. Donec ultricies arcu eu justo aliquam ullamcorper. Cras id lacus nec orci faucibus laoreet vel sit amet ipsum.
          </p>
        </article>

        {/* Exemplo de mais artigos */}
        <article className="article">
          <h2>Artigo 1</h2>
          <img src="caminho/para/imagem.jpg" alt="Artigo 1" />
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget purus in nulla pharetra tincidunt. Proin consectetur felis ut tellus ultricies, eget suscipit libero varius. Integer tempus, urna a tincidunt finibus, mauris elit tempor est, nec cursus orci sapien at ipsum. Donec ultricies arcu eu justo aliquam ullamcorper. Cras id lacus nec orci faucibus laoreet vel sit amet ipsum.
          </p>
        </article>

        <article className="article">
          <h2>Artigo 2</h2>
          <img src="caminho/para/imagem.jpg" alt="Artigo 2" />
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget purus in nulla pharetra tincidunt. Proin consectetur felis ut tellus ultricies, eget suscipit libero varius. Integer tempus, urna a tincidunt finibus, mauris elit tempor est, nec cursus orci sapien at ipsum. Donec ultricies arcu eu justo aliquam ullamcorper. Cras id lacus nec orci faucibus laoreet vel sit amet ipsum.
          </p>
        </article>

        {/* Mais artigos podem ser adicionados conforme necessário */}
      </div>
    </div>
    <Footer></Footer>
    </div>
  );
};

export default JornalPage;
