import "./css/navbar.css";

function NavBar() {
  return (
    <nav
      className="navbar navbar-expand-lg text-white"
      style={{ backgroundColor: "#F5BB00" }}
    >
      <div className="container-fluid ">
        <a className="navbar-brand text-white" href="/dashboard">
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
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle text-white"
                href="#"
                id="feedbacksDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Feedbacks
              </a>
              <ul className="dropdown-menu" aria-labelledby="feedbacksDropdown">
                <li>
                  <a className="dropdown-item" href="#">
                    Atendimento Presencial
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Qualidade do Produto
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Desempenho dos Funcionários
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a className="dropdown-item" href="/registro-feedback">
                    Novo Feedback
                  </a>
                </li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle text-white"
                href="#"
                id="clientesDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Clientes
              </a>
              <ul className="dropdown-menu" aria-labelledby="clientesDropdown">
                <li>
                  <a className="dropdown-item" href="/clientes">
                    Listar Clientes
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/clientes/novo">
                    Novo Cliente
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Grupos de Clientes
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Histórico de Interações
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Importar Clientes
                  </a>
                </li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle text-white"
                href="#"
                id="produtosDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Produtos
              </a>
              <ul className="dropdown-menu" aria-labelledby="produtosDropdown">
                <li>
                  <a className="dropdown-item" href="/produtos/listar">
                    Listar Produtos/Serviços
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Novo Produto/Serviço
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Categorias
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Atributos/Características
                  </a>
                </li>
                {/* Adicione mais opções se necessário (ex: Estoque) */}
              </ul>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle text-white"
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
                <li>
                  <a className="dropdown-item" href="/funcionarios/listar">
                    Listar Funcionários
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Novo Funcionário
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item"
                    href="#"
                  >
                    Departamentos
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Cargos
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Equipes/Times
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a
                    className="dropdown-item"
                    href="#"
                  >
                    Treinamentos
                  </a>
                </li>
              </ul>
            </li>
            <hr />
          </div>
          <div className="dropdown text-end text-md-start text-lg-start">
                       {" "}
            <a
              href="#"
              className="d-flex align-items-center link-body-emphasis text-decoration-none dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
                           {" "}
              <img
                src="https://github.com/mdo.png"
                alt=""
                width={32}
                height={32}
                className="rounded-circle me-2"
              />
                            <strong className="text-white">Usuário</strong>     
                   {" "}
            </a>
                       {" "}
            <ul className="dropdown-menu text-small shadow dropdown-menu-md-end">
                           {" "}
              <li>
                               {" "}
                <a className="dropdown-item" href="#">
                                    Histórico                {" "}
                </a>
                             {" "}
              </li>
                           {" "}
              <li>
                               {" "}
                <a className="dropdown-item" href="/configuracoes">
                                    Configurações                {" "}
                </a>
                             {" "}
              </li>
                           {" "}
              <li>
                               {" "}
                <a className="dropdown-item" href="#">
                                    Perfil                {" "}
                </a>
                             {" "}
              </li>
                           {" "}
              <li>
                               {" "}
                <a className="dropdown-item" href="/sobre">
                                    Sobre                {" "}
                </a>
                             {" "}
              </li>
                           {" "}
              <li>
                                <hr className="dropdown-divider" />             {" "}
              </li>
                           {" "}
              <li>
                               {" "}
                <a className="dropdown-item" href="/">
                                    Sair                {" "}
                </a>
                             {" "}
              </li>
                         {" "}
            </ul>
                     {" "}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
