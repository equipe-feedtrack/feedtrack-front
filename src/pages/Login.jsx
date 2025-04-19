import React, { useState } from 'react';
import '../../public/css/src/login.css';

function Login() {
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [alerta, setAlerta] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();

    let mensagemErro = '';
    if (!usuario.trim()) mensagemErro += 'O campo usuário é obrigatório.\n';
    if (!password.trim()) mensagemErro += 'A senha é obrigatória.\n';

    if (mensagemErro) {
      alert(mensagemErro);
    } else {
      setAlerta({ tipo: 'success', mensagem: 'Login realizado com sucesso!' });
      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 1000);
    }
  };

  return (
    <div>
      <div id="liveAlertPlaceholder">
        {alerta && (
          <div className={`alert alert-${alerta.tipo} alert-dismissible`} role="alert">
            <div>{alerta.mensagem}</div>
            <button
              type="button"
              className="btn-close"
              onClick={() => setAlerta(null)}
              aria-label="Close"
            ></button>
          </div>
        )}
      </div>

      <div className="container-fluid container-main">
        <div className="title-text mt-3 text-white">
          <h1>Bem-vindo! Esse é o Feedtrack <i className="fa-regular fa-handshake" /></h1>
          <h3>Faça o login para continuar:</h3>
        </div>
        <div className="container-index container p-5 my-5 bg-dark container-sm container-md container-lg container-xl">
          <div className="text-white container-lateral">
            <div className="content-rotacion">
              <h1>FEED</h1>
              <div className="linha" />
            </div>
            <div className="content-rotacion">
              <div className="linha" />
              <h1>TRACK</h1>
            </div>
          </div>
          <form className="form" onSubmit={handleSubmit}>
            <span className="input-span">
              <label htmlFor="usuario" className="label form-label">Usuário</label>
              <input
                type="text"
                name="usuario"
                id="usuario"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
              />
            </span>
            <span className="input-span">
              <label htmlFor="password" className="label form-label">Senha</label>
              <input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </span>
            <span className="span"><a href="#">Esqueceu a senha?</a></span>
            <input className="submit" type="submit" value="Login" />
            <span className="span"> <a href="#">Cadastre-se caso não tenha login!</a></span>
          </form>
        </div>
      </div>

      <footer className="container-fluid footer navbar-fixed-bottom">
        <hr />
        © <span><a href="#" target="_blank">FeedTrack.com.br</a> 2024</span>
      </footer>
    </div>
  );
}

export default Login;
