function NavBar() {
    return (
      <nav
        className="navbar text-white navbar-light"
        style={{ backgroundColor: "#F5BB00" }}
      >
        <div className="container-fluid d-flex justify-content-between align-items-center">
          <a className="navbar-brand text-white" href="/dashboard">
            Feedtrack
          </a>
          <div className="dropdown">
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
            <ul className="dropdown-menu text-small shadow dropdown-menu-end">
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
                <a className="dropdown-item" href="/sobre">
                  Sobre
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
      </nav>
    );
  }
  
  export default NavBar;