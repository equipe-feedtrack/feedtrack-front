// src/contexts/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

// Crie o contexto
const AuthContext = createContext(null);

// Crie um provedor para o contexto
export const AuthProvider = ({ children }) => {
  // Estado para armazenar o usuário logado e seu papel
  const [user, setUser] = useState(null); // Ex: { username: 'admin', role: 'admin' }

  // Exemplo: Carregar o usuário do localStorage (em um app real, viria de uma API)
  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Função de login (simulada)
  const login = (username, password) => {
    // Em um app real, aqui você faria uma chamada API para autenticar o usuário
    // e receberia o token e o papel do usuário.
    if (username === 'admin' && password === 'admin123') {
      const adminUser = { username: 'admin', role: 'admin', name: 'Administrador' };
      setUser(adminUser);
      localStorage.setItem('currentUser', JSON.stringify(adminUser));
      return true;
    } else if (username === 'funcionario' && password === 'func123') {
      const employeeUser = { username: 'funcionario', role: 'funcionario', name: 'Funcionário' };
      setUser(employeeUser);
      localStorage.setItem('currentUser', JSON.stringify(employeeUser));
      return true;
    }
    return false;
  };

  // Função de logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  // Valor que será fornecido para os componentes
  const authContextValue = {
    user,
    isAuthenticated: !!user, // Booleano: true se houver um usuário, false caso contrário
    isAdmin: user && user.role === 'admin',
    isEmployee: user && user.role === 'funcionario',
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};