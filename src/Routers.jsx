// src/routes/Router.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import RegistroFeedback from './pages/RegistroFeedback';
import CadastroCliente from './pages/CadastroCliente';
import CadastroProduto from './pages/CadastroProduto.jsx';
import CadastroFuncionario from './pages/CadastroFuncionario.jsx';
import Sobre from './pages/Sobre';
import Configuracoes from './pages/Configuracoes.jsx';

const Router = () => {
  return (
    <Routes>
      <Route path='/' element={<Login/>}></Route>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/registro-feedback" element={<RegistroFeedback />} />
      <Route path="/cadastro-cliente" element={<CadastroCliente />} />
      <Route path="/cadastro-produto" element={<CadastroProduto />} />
      <Route path="/cadastro-funcionario" element={<CadastroFuncionario />} />
      <Route path="/sobre" element={<Sobre />} />
      <Route path="/configuracoes" element={<Configuracoes />} />
    </Routes>
  );
};

export default Router;
