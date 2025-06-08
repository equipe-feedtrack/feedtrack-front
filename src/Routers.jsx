// src/routes/Router.jsx

import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext.jsx';

// Importe suas páginas
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import RegistroFeedback from './pages/RegistroFeedback';
import CadastroCliente from './pages/CadastroCliente';
import CadastroProdutos from './pages/CadastroProdutos.jsx';
import CadastroFuncionario from './pages/CadastroFuncionario';
import Sobre from './pages/Sobre';
import ListarClientes from './pages/ListarClientes.jsx';
import AdminDash from './pages/admin/Dash.jsx';
import DesempenhoFuncionarios from './pages/DesempenhoFuncionarios';
import ListaProdutos from './pages/ListaProdutos.jsx';
import RecuperarSenha from './pages/RecuperarSenha.jsx';
import Perfil from './pages/Perfil.jsx';
import QualidadeProduto from './pages/QualidadeProduto.jsx';
import Master from './pages/admin/Dash.jsx'; // Importando a página Master (se for um componente diferente, ajuste)

// Componente PrivateRoute (mantém como está)
const PrivateRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated, user } = useAuth();
  const userRole = user?.role;

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // O redirecionamento aqui pode ser ajustado se você quiser uma página de "acesso negado" específica
  // para cada tipo de usuário. Por enquanto, '/admin/dashboard' é o padrão.
  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to="/admin/dashboard" replace />; // Ou para o dashboard padrão
  }

  return children;
};

const AppRouter = () => {
  return (
    <Routes>
      {/* Rotas Públicas */}
      <Route path='/' element={<Login />} />
      <Route path="/sobre" element={<Sobre />} />
      <Route path="/recuperar-senha" element={<RecuperarSenha />} />

      {/* Rota Exclusiva para MASTER */}
      <Route
        path='/master'
        element={
          <PrivateRoute allowedRoles={['master']}> {/* <--- AGORA PROTEGIDA PARA MASTER */}
            <Master />
          </PrivateRoute>
        }
      />

      {/* Rotas Protegidas para Admin e Funcionário (continua como antes) */}
      <Route
        path="/admin/dashboard"
        element={
          <PrivateRoute allowedRoles={['admin', 'funcionario']}>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/registro-feedback"
        element={
          <PrivateRoute allowedRoles={['admin', 'funcionario']}>
            <RegistroFeedback />
          </PrivateRoute>
        }
      />
      <Route
        path='/clientes'
        element={
          <PrivateRoute allowedRoles={['admin', 'funcionario']}>
            <ListarClientes />
          </PrivateRoute>
        }
      />
      <Route
        path="/clientes/novo"
        element={
          <PrivateRoute allowedRoles={['admin', 'funcionario']}>
            <CadastroCliente />
          </PrivateRoute>
        }
      />
      <Route
        path="/produtos/listar"
        element={
          <PrivateRoute allowedRoles={['admin', 'funcionario']}>
            <ListaProdutos />
          </PrivateRoute>
        }
      />
      <Route
        path="/produtos/novo"
        element={
          <PrivateRoute allowedRoles={['admin', 'funcionario']}>
            <CadastroProdutos />
          </PrivateRoute>
        }
      />

      <Route
        path="/qualidade-produto"
        element={
          <PrivateRoute allowedRoles={['admin', 'funcionario']}>
            <QualidadeProduto />
          </PrivateRoute>
        }
      />

      <Route
        path="/perfil"
        element={
          <PrivateRoute allowedRoles={['admin', 'funcionario', 'master']}> {/* Adicionei 'master' aqui também */}
            <Perfil />
          </PrivateRoute>
        }
      />

      {/* Rotas Exclusivas para ADMINISTRADORES */}
      <Route
        path="/admin"
        element={
          <PrivateRoute allowedRoles={['admin']}>
            <AdminDash />
          </PrivateRoute>
        }
      />
      <Route
        path="/funcionarios/listar"
        element={
          <PrivateRoute allowedRoles={['admin']}>
            <CadastroFuncionario />
          </PrivateRoute>
        }
      />
      <Route
        path="/funcionarios/desempenho"
        element={
          <PrivateRoute allowedRoles={['admin']}>
            <DesempenhoFuncionarios />
          </PrivateRoute>
        }
      />

      {/* Rota curinga */}
      <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
    </Routes>
  );
};

export default AppRouter;