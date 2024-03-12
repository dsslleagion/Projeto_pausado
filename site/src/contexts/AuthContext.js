import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(() => {
    const storedUserData = localStorage.getItem('userData');
    return storedUserData ? JSON.parse(storedUserData) : { token: null, cliente: null };
  });

  const login = async (email, password) => {
    try {
      const response = await fetch('/cliente/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Erro ao fazer login');
      }

      const { token, ...clienteData } = await response.json();

      localStorage.setItem('userData', JSON.stringify({ token, cliente: clienteData }));
      setUserData({ token, cliente: clienteData });
    } catch (error) {
      console.error('Erro ao fazer login:', error.message);
    }
  };

  const logout = () => {
    localStorage.removeItem('userData');
    setUserData({ token: null, cliente: null });
    window.location.href = "/";
  };

  const receiveUserData = (json) => {
    localStorage.setItem('userData', JSON.stringify(json));
    setUserData(json);
  };

  const getClienteById = async (id) => {
    try {
      const response = await fetch(`/cliente/specific/${id}`);
      if (!response.ok) {
        throw new Error('Erro ao obter dados do cliente');
      }
      const clienteData = await response.json();
      return clienteData;
    } catch (error) {
      console.error('Erro ao obter dados do cliente:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ userData, login, logout, receiveUserData, getClienteById }}>
      {children}
    </AuthContext.Provider>
  );
};
