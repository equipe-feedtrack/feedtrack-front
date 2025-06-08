import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom"; // Importe useNavigate para React Router v6
import { useAuth } from "../contexts/AuthContext"; // Importe o hook useAuth
import "./css/login.css";

function Login() {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [alerta, setAlerta] = useState(null); // { tipo: 'success'/'danger', mensagem: '...' }

  const { login, isAuthenticated, isAdmin, isEmployee, isMaster } = useAuth(); // Consumindo o contexto de autenticação
  const navigate = useNavigate(); // Hook para navegação programática

  // Efeito para redirecionar se o usuário já estiver autenticado
  useEffect(() => {
    if (isAuthenticated) {
      if (isAdmin) {
        navigate("/admin/dashboard", { replace: true });
      } else if (isEmployee) {
        navigate("/admin/dashboard", { replace: true }); // Ou '/funcionario/dashboard' se tiver um dashboard específico
      } else if (isMaster) {
        navigate("/master", { replace: true });
      }
    }
  }, [isAuthenticated, isAdmin, isEmployee, isMaster, navigate]); // Dependências do useEffect

  const handleSubmit = async (event) => { // Tornar a função assíncrona se o 'login' for assíncrono (chamada de API)
    event.preventDefault();
    setAlerta(null); // Limpa qualquer alerta anterior

    // Validação básica dos campos (frontend)
    if (!usuario.trim()) {
      setAlerta({ tipo: "danger", mensagem: "O campo Usuário é obrigatório." });
      return;
    }
    if (!password.trim()) {
      setAlerta({ tipo: "danger", mensagem: "A Senha é obrigatória." });
      return;
    }

    // Tentar fazer login usando a função do AuthContext
    try {
      const success = await login(usuario, password); // `login` pode ser assíncrono se fizer chamada de API

      if (success) {
        setAlerta({ tipo: "success", mensagem: "Login realizado com sucesso! Redirecionando..." });
        // O redirecionamento será tratado pelo useEffect acima
      } else {
        setAlerta({ tipo: "danger", mensagem: "Credenciais inválidas. Verifique seu usuário e senha." });
      }
    } catch (error) {
      console.error("Erro durante o login:", error);
      setAlerta({ tipo: "danger", mensagem: "Ocorreu um erro ao tentar fazer login. Tente novamente mais tarde." });
    }
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center login-page">
      <div className="container-fluid d-flex justify-content-center align-items-center flex-column">
        <h1 className="text-center">FeedTrack - Software</h1>
        <div className="row w-100 justify-content-center">
          <div className="col-10 col-md-8 col-lg-6 d-flex">
            {/* Imagem centralizada verticalmente */}
            <div className="d-none d-md-flex align-items-center me-4">
              <img
                src="/img/login.jpg"
                alt="Login"
                width={300}
                height={300}
                className="img-fluid"
              />
            </div>

            {/* Formulário centralizado na tela */}
            <form
              className="d-flex flex-column justify-content-center flex-grow-1"
              onSubmit={handleSubmit}
            >
              {alerta && (
                <div
                  className={`alert alert-${alerta.tipo} alert-dismissible fade show`} // Adicionado 'fade show' para animação Bootstrap
                  role="alert"
                >
                  <div>{alerta.mensagem}</div>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setAlerta(null)}
                    aria-label="Close"
                  ></button>
                </div>
              )}
              <div className="mb-3">
                <label htmlFor="usuario" className="form-label">
                  Usuário
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="usuario"
                  value={usuario}
                  onChange={(e) => setUsuario(e.target.value)}
                  // Adicionado 'required' para validação HTML5
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Senha
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  // Adicionado 'required' para validação HTML5
                  required
                />
              </div>
              <div className="mb-2">
                <Link to="/recuperar-senha">Esqueceu a senha?</Link>
              </div>
              <button type="submit" className="btn btn-primary mb-2">
                Login
              </button>
              <p className="mt-3 text-center">
                <small>Teste com: admin/admin123 ou funcionario/func123</small>
            </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;