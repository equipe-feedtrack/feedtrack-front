import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import "./css/navbar.css";

function NavBar({ themeColor }) {
  const { user, isAuthenticated, isAdmin, isEmployee, logout } = useAuth();
  const [textColorClass, setTextColorClass] = useState('text-white');

  useEffect(() => {
    const isColorDark = (hexColor) => {
      if (!hexColor) return true;
      const cleanHex = hexColor.startsWith('#') ? hexColor.slice(1) : hexColor;
      const r = parseInt(cleanHex.substring(0, 2), 16);
      const g = parseInt(cleanHex.substring(2, 4), 16);
      const b = parseInt(cleanHex.substring(4, 6), 16);
      const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
      return luminance <= 0.5;
    };

    if (isColorDark(themeColor || '#F5BB00')) {
      setTextColorClass('text-white');
    } else {
      setTextColorClass('text-dark');
    }
  }, [themeColor]);

  return (
    <nav
      className={`navbar navbar-expand-lg ${textColorClass}`}
      style={{ backgroundColor: themeColor || '#F5BB00' }}
    >
      <div className="container-fluid">
        <Link
          className={`navbar-brand ${textColorClass}`}
          to={isAuthenticated ? (isAdmin ? "/admin/dashboard" : "/admin/dashboard") : "/"}
        >
          FeedTrack
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className={`navbar-toggler-icon ${textColorClass === 'text-white' ? 'navbar-dark' : 'navbar-light'}`} />
        </button>

        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav m-auto">
            {isAuthenticated && (
              <>
                {/* Os links dropdown-toggle devem usar textColorClass */}
                <li className="nav-item dropdown">
                  <a
                    className={`nav-link dropdown-toggle ${textColorClass}`} // APLICA textColorClass AQUI
                    href="#"
                    id="feedbacksDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Feedbacks
                  </a>
                  <ul className="dropdown-menu" aria-labelledby="feedbacksDropdown">

                    <li><Link className="dropdown-item" to="/qualidade-produto">Qualidade do Produto</Link></li>
                    {isAdmin && (
                        <li><Link className="dropdown-item" to="/funcionarios/desempenho">Desempenho dos Funcionários</Link></li>
                    )}
                    <li><hr className="dropdown-divider" /></li>
                    <li><Link className="dropdown-item" to="/registro-feedback">Novo Feedback</Link></li>
                  </ul>
                </li>

                {/* Repita a lógica para Clientes, Produtos e Funcionários */}
                {(isAdmin || isEmployee) && (
                    <li className="nav-item dropdown">
                        <a
                            className={`nav-link dropdown-toggle ${textColorClass}`} // APLICA textColorClass AQUI
                            href="#"
                            id="clientesDropdown"
                            role="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            Clientes
                        </a>
                        <ul className="dropdown-menu" aria-labelledby="clientesDropdown">
                            <li><Link className="dropdown-item" to="/clientes">Listar Clientes</Link></li>
                            <li><Link className="dropdown-item" to="/clientes/novo">Novo Cliente</Link></li>
                            {isAdmin && (
                                <>
                                    <li><Link className="dropdown-item" to="#">Grupos de Clientes</Link></li>
                                    <li><Link className="dropdown-item" to="#">Histórico de Interações</Link></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><Link className="dropdown-item" to="#">Importar Clientes</Link></li>
                                </>
                            )}
                        </ul>
                    </li>
                )}

                {(isAdmin || isEmployee) && (
                    <li className="nav-item dropdown">
                        <a
                            className={`nav-link dropdown-toggle ${textColorClass}`} // APLICA textColorClass AQUI
                            href="#"
                            id="produtosDropdown"
                            role="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            Produtos
                        </a>
                        <ul className="dropdown-menu" aria-labelledby="produtosDropdown">
                            <li><Link className="dropdown-item" to="/produtos/listar">Listar Produtos/Serviços</Link></li>
                            <li><Link className="dropdown-item" to="/produtos/novo">Novo Produto/Serviço</Link></li>
                            {isAdmin && (
                                <>
                                    <li><Link className="dropdown-item" to="#">Categorias</Link></li>
                                    <li><Link className="dropdown-item" to="#">Atributos/Características</Link></li>
                                </>
                            )}
                        </ul>
                    </li>
                )}

                {isAdmin && (
                  <li className="nav-item dropdown">
                    <a
                      className={`nav-link dropdown-toggle ${textColorClass}`} // APLICA textColorClass AQUI
                      href="#"
                      id="funcionariosDropdown"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Funcionários
                    </a>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="funcionariosDropdown"
                    >
                      <li><Link className="dropdown-item" to="/funcionarios/listar">Listar Funcionários</Link></li>
                      <li><Link className="dropdown-item" to="#">Departamentos</Link></li>
                      <li><Link className="dropdown-item" to="#">Cargos</Link></li>
                      <li><Link className="dropdown-item" to="#">Equipes/Times</Link></li>
                      <li><hr className="dropdown-divider" /></li>
                      <li><Link className="dropdown-item" to="#">Treinamentos</Link></li>
                    </ul>
                  </li>
                )}
                <hr className="d-lg-none" />
              </>
            )}
          </div>

          <div className="dropdown text-end text-md-start text-lg-start">
            {isAuthenticated ? (
              <a
                href="#"
                className="d-flex align-items-center link-body-emphasis text-decoration-none dropdown-toggle"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  src="https://github.com/mdo.png"
                  alt="Avatar do Usuário"
                  width={32}
                  height={32}
                  className="rounded-circle me-2"
                />
                <strong className={textColorClass}>{user?.name || 'Usuário'}</strong>
              </a>
            ) : (
                <Link to="/" className={`btn btn-outline-${textColorClass === 'text-white' ? 'light' : 'dark'}`}>Login</Link>
            )}

            {isAuthenticated && (
              <ul className="dropdown-menu text-small shadow dropdown-menu-md-end">

                <li><Link className="dropdown-item" to="/perfil">Perfil</Link></li>
                <li><Link className="dropdown-item" to="/sobre">Sobre</Link></li>
                <li><hr className="dropdown-divider" /></li>
                <li><a className="dropdown-item" href="#" onClick={logout}>Sair</a></li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;