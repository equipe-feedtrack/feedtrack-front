import React, { useState } from "react";
import "./css/login.css";

function Login() {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [alerta, setAlerta] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();

    let mensagemErro = "";
    if (!usuario.trim()) mensagemErro += "O campo usuário é obrigatório.\n";
    if (!password.trim()) mensagemErro += "A senha é obrigatória.\n";

    if (mensagemErro) {
      alert(mensagemErro);
    } else {
      setAlerta({ tipo: "success", mensagem: "Login realizado com sucesso!" });
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 1000);
    }
  };

  return (
    <div className=" d-flex flex-column justify-content-center align-items-center login-page">
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
                  className={`alert alert-${alerta.tipo} alert-dismissible`}
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
                />
              </div>
              <div className="mb-2">
                <a href="#">Esqueceu a senha?</a>
              </div>
              <button type="submit" className="btn btn-primary mb-2">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
