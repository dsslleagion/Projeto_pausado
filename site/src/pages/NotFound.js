import React from 'react';
import NavigationBar from '../components/NavigationBar';

import Footer from '../components/Footer';
const NotFound = () => {
  return (
    <div>
      <NavigationBar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Página não encontrada</h1>
        <p>A página que você está procurando não foi encontrada.</p>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default NotFound;
