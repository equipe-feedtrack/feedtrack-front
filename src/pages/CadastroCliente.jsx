import React, { useState } from 'react';
import NavBar from '../components/NavBar';

function CadastroCliente() {
  const [novoCliente, setNovoCliente] = useState({ cpf: '', telefone: '', nome: '', dataNascimento: '' });
  const [alerta, setAlerta] = useState(null);

  const mostrarAlerta = (mensagem, tipo) => {
    setAlerta({ mensagem, tipo });
    setTimeout(() => {
      setAlerta(null);
    }, 3000);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNovoCliente({ ...novoCliente, [name]: value });
  };

  const adicionarCliente = (event) => {
    event.preventDefault();
    if (!novoCliente.telefone || !/^\d{11}$/.test(novoCliente.telefone.replace(/\D/g, ''))) {
      mostrarAlerta('O telefone deve conter 11 dígitos.', 'danger');
      return;
    }
    if (!novoCliente.nome) {
      mostrarAlerta('O campo Nome é obrigatório.', 'danger');
      return;
    }
    if (!novoCliente.dataNascimento) {
      mostrarAlerta('A Data de Nascimento é obrigatória.', 'danger');
      return;
    }
    // Aqui você faria a lógica para enviar os dados do novo cliente para o seu backend
    console.log('Cliente a ser cadastrado:', novoCliente);
    mostrarAlerta('Cliente cadastrado com sucesso!', 'success');
    setNovoCliente({ cpf: '', telefone: '', nome: '', dataNascimento: '' });
  };

  return (
    <div>
      <NavBar />
      <main>
        <div id="liveAlertPlaceholder">
          {alerta && (
            <div className={`alert alert-${alerta.tipo} alert-dismissible fade show`} role="alert">
              {alerta.mensagem}
              <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
          )}
        </div>
        <h1 className="m-5 text-center text-dark">Cadastrar Novo Cliente</h1>
        <div className="col-md-6 m-auto">
          <div className="card modal-cadastro p-4">
            <form onSubmit={adicionarCliente}>
              <div className="mb-3">
                <label htmlFor="cpfCliente" className="form-label text-dark">CPF (opcional)</label>
                <input
                  type="text"
                  className="form-control text-dark"
                  id="cpfCliente"
                  name="cpf"
                  maxLength="14"
                  placeholder="000.000.000-00"
                  value={novoCliente.cpf}
                  onChange={handleInputChange}
                  onInput={(e) => {
                    let cpf = e.target.value;
                    cpf = cpf.replace(/\D/g, '');
                    cpf = cpf.replace(/^(\d{3})(\d)/, '$1.$2');
                    cpf = cpf.replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3');
                    cpf = cpf.replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3-$4');
                    e.target.value = cpf;
                  }}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="telefoneCliente" className="form-label text-dark">Telefone</label>
                <input
                  type="text"
                  className="form-control text-dark"
                  id="telefoneCliente"
                  name="telefone"
                  maxLength="16"
                  placeholder="(79) 9 9999-9999"
                  value={novoCliente.telefone}
                  onChange={handleInputChange}
                  required
                  onInput={(e) => {
                    let telefone = e.target.value;
                    telefone = telefone.replace(/\D/g, '');
                    if (telefone.length <= 2) {
                      telefone = telefone.replace(/^(\d{2})/, '($1) ');
                    } else if (telefone.length <= 6) {
                      telefone = telefone.replace(/^(\d{2})(\d{1})/, '($1) $2 ');
                    } else if (telefone.length <= 10) {
                      telefone = telefone.replace(/^(\d{2})(\d{1})(\d{4})/, '($1) $2 $3-');
                    } else {
                      telefone = telefone.replace(/^(\d{2})(\d{1})(\d{4})(\d{4})/, '($1) $2 $3-$4');
                    }
                    e.target.value = telefone;
                  }}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="nomeCliente" className="form-label text-dark">Nome</label>
                <input
                  type="text"
                  className="form-control text-dark"
                  name="nome"
                  id="nomeCliente"
                  value={novoCliente.nome}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="dataNascimento" className="form-label text-dark">Data de Nascimento</label>
                <input
                  type="date"
                  className="form-control text-dark"
                  name="dataNascimento"
                  id="dataNascimento"
                  value={novoCliente.dataNascimento}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <button type="submit" className="btn btn-success enviar">
                Cadastrar
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}

export default CadastroCliente;