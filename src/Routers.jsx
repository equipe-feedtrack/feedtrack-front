// src/routes/Router.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import RegistroFeedback from './pages/RegistroFeedback';
import CadastroCliente from './pages/CadastroCliente';
import CadastroProduto from './pages/CadastroProduto';
import CadastroFuncionario from './pages/CadastroFuncionario';
import Sobre from './pages/Sobre';
import Configuracoes from './pages/Configuracoes';
import ListarClientes from './pages/ListarClientes.jsx';

const Router = () => {
  return (
    <Routes>
      <Route path='/' element={<Login/>}></Route>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/registro-feedback" element={<RegistroFeedback />} />

      <Route path='/clientes' element={<ListarClientes />} />
      <Route path="/clientes/novo" element={<CadastroCliente />} />



      <Route path="/produtos/listar" element={<CadastroProduto />} />
      <Route path="/funcionarios/listar" element={<CadastroFuncionario />} />
      <Route path="/sobre" element={<Sobre />} />
      <Route path="/configuracoes" element={<Configuracoes />} />
    </Routes>
  );
};

export default Router;
