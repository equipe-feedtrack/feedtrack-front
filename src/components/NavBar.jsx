/**
 * NavBar component renders the navigation bar for the Feedtrack application.
 * 
 * The navigation bar includes:
 * - Brand logo/name
 * - Responsive toggle button for mobile view
 * - Navigation links to different pages (Dashboard, Feedbacks, Clients, Products, Employees, About)
 * - User dropdown menu with options for History, Settings, Profile, and Logout
 * 
 * @returns {React.JSX.Element} A navigation bar component with Bootstrap styling
 */
import React from "react";

function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg text-white" style={{ backgroundColor: "#2B3035" }}>
      <div className="container-fluid ">
        <a className="navbar-brand text-white" href="index.html">
          Feedtrack
        </a>
        <button
          className="navbar-toggler" 
          style={{ backgroundColor: "#61677A" }}
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav m-auto">
            <a className="nav-link text-white opacity-50 " aria-current="page" href="/dashboard">
              Dashboard
            </a>
            <a className="nav-link text-white opacity-50" href="/registro-feedback">
              Feedbacks
            </a>
            <a className="nav-link text-white opacity-50" href="/cadastro-cliente">
              Clientes
            </a>
            <a className="nav-link text-white opacity-50" href="/cadastro-produto">
              Produtos
            </a>
            <a className="nav-link text-white opacity-50" href="/cadastro-funcionario">
              Funcionários
            </a>
            <a className="nav-link text-white opacity-50" href="/sobre">
              Sobre
            </a>
            <hr />
          </div>
          <div className="dropdown text-end text-md-start text-lg-start">
            <a
              href="#"
              className="d-flex align-items-center link-body-emphasis text-decoration-none dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <img
                src="https://github.com/mdo.png"
                alt=""
                width={32}
                height={32}
                className="rounded-circle me-2"
              />
              <strong className="text-white">Usuário</strong>
            </a>
            <ul className="dropdown-menu text-small shadow dropdown-menu-md-end">
              <li>
                <a className="dropdown-item" href="#">
                  Histórico
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="/configuracoes">
                  Configurações
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Perfil
                </a>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <a className="dropdown-item" href="/">
                  Sair
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
