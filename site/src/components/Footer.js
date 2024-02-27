import React, { useEffect, useState } from 'react';
import './Footer.css';

const Footer = () => {
  const [showFooter, setShowFooter] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScroll = () => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollBottom = scrollTop + windowHeight;

    // Exibir o footer quando o usuário estiver próximo do final da página
    if (scrollBottom >= documentHeight - 100) {
      setShowFooter(true);
    } else {
      setShowFooter(false);
    }
  };

  return (
    <footer className={`footer-container ${showFooter ? 'show-footer' : ''}`}>
      <div className="footer-content">
        <div className="social-media">
          <h2>Redes Sociais</h2>
          <ul className="social-icons">
            <li><a href="#"><i className="fab fa-facebook-f"></i></a></li>
            <li><a href="#"><i className="fab fa-twitter"></i></a></li>
            <li><a href="#"><i className="fab fa-instagram"></i></a></li>
            <li><a href="#"><i className="fab fa-linkedin-in"></i></a></li>
          </ul>
        </div>
        <div className="contact-info">
          <h2>Contato</h2>
          <p>Telefone: (00) 1234-5678</p>
          <p>Email: exemplo@example.com</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 Nome da Sua Empresa. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
