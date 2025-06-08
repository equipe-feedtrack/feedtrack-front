import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Importe Link e useNavigate
import { useAuth } from '../contexts/AuthContext'; // Importe o useAuth

function NavBar() {
  const { user, logout } = useAuth(); // Pega o usuário logado e a função logout do contexto
  const navigate = useNavigate(); // Hook para navegação programática

  const handleLogout = () => {
    logout(); // Chama a função logout do AuthContext
    navigate('/'); // Redireciona para a página de login após o logout
  };

  // Determina o nome a ser exibido (pode ser user.name ou user.username)
  const userNameDisplay = user?.name || user?.username || 'Usuário';
  const userImage = user?.profilePic || "https://github.com/mdo.png"; // Se tiver uma imagem de perfil no user

  return (
    <nav
      className="navbar text-white navbar-light"
      style={{ backgroundColor: "#F5BB00" }}
    >
      <div className="container-fluid d-flex justify-content-between align-items-center">
        {/* Link para o dashboard master, ajustável conforme o papel do usuário */}
        <Link className="navbar-brand text-white" to="/master">
          Feedtrack
        </Link>
        <div className="dropdown">
          <a
            href="#" // Mantenha '#' para o dropdown funcionar com Bootstrap
            className="d-flex align-items-center link-body-emphasis text-decoration-none dropdown-toggle"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <img
              src={userImage} // Use a imagem de perfil do usuário, se disponível
              alt="Avatar do Usuário"
              width={32}
              height={32}
              className="rounded-circle me-2"
            />
            <strong className="text-white">{userNameDisplay}</strong> {/* Exibe o nome do usuário */}
          </a>
          <ul className="dropdown-menu text-small shadow dropdown-menu-end">
            <li>
              <Link className="dropdown-item" to="#">
                Histórico
              </Link>
            </li>
            <li>
              <Link className="dropdown-item" to="#">
                Configurações
              </Link>
            </li>
            <li>
              <Link className="dropdown-item" to="#"> {/* Use Link para rotas internas */}
                Perfil
              </Link>
            </li>
            <li>
              <Link className="dropdown-item" to="#"> {/* Use Link para rotas internas */}
                Sobre
              </Link>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              {/* O botão "Sair" agora chama handleLogout */}
              <button className="dropdown-item" onClick={handleLogout}>
                Sair
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;