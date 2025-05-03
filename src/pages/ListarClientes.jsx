import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import NavBar from '../components/NavBar';

const clientesBase = [
  { cpf: '123.456.789-00', telefone: '(11) 91234-5678', nome: 'Ana Clara Souza', dataNascimento: '1992-05-14' },
  { cpf: '987.654.321-00', telefone: '(21) 99876-5432', nome: 'Bruno Henrique Lima', dataNascimento: '1988-09-22' },
  { cpf: '456.789.123-00', telefone: '(31) 98765-4321', nome: 'Carla Menezes Rocha', dataNascimento: '2000-01-30' },
  { cpf: '321.654.987-00', telefone: '(41) 97654-3210', nome: 'Diego Alves Ferreira', dataNascimento: '1995-07-09' },
  { cpf: '111.222.333-44', telefone: '(51) 98888-7777', nome: 'Eduarda Martins', dataNascimento: '1997-11-03' },
  { cpf: '222.333.444-55', telefone: '(61) 99999-0000', nome: 'Felipe Costa', dataNascimento: '1985-03-18' },
  { cpf: '333.444.555-66', telefone: '(71) 97777-8888', nome: 'Gabriela Oliveira', dataNascimento: '1991-06-25' },
  { cpf: '444.555.666-77', telefone: '(81) 96666-5555', nome: 'Hugo Pereira', dataNascimento: '1989-12-01' },
  { cpf: '555.666.777-88', telefone: '(91) 95555-4444', nome: 'Isabela Santos', dataNascimento: '2002-08-10' },
  { cpf: '666.777.888-99', telefone: '(27) 94444-3333', nome: 'João Ricardo Alves', dataNascimento: '1993-04-07' },
  { cpf: '777.888.999-01', telefone: '(32) 93333-2222', nome: 'Laura Souza', dataNascimento: '1998-02-15' },
  { cpf: '888.999.000-12', telefone: '(47) 92222-1111', nome: 'Marcos Vinicius', dataNascimento: '1987-10-29' },
  { cpf: '999.000.111-23', telefone: '(55) 91111-0000', nome: 'Natália Rodrigues', dataNascimento: '2001-07-21' },
  { cpf: '000.111.222-34', telefone: '(62) 90000-9999', nome: 'Pedro Henrique', dataNascimento: '1996-09-05' },
  { cpf: '111.222.333-56', telefone: '(73) 99888-7777', nome: 'Raquel Fernandes', dataNascimento: '1990-11-12' },
];

function ListarClientes() {
  const [clientes, setClientes] = useState(clientesBase);
  const [clienteEditando, setClienteEditando] = useState(null);
  const [modalEditarClienteVisivel, setModalEditarClienteVisivel] = useState(false);
  const [modalDeletarClienteVisivel, setModalDeletarClienteVisivel] = useState(null);
  const [alerta, setAlerta] = useState(null);
  const [paginaAtual, setPaginaAtual] = useState(0);
  const clientesPorPagina = 5;
  const totalPaginas = Math.ceil(clientes.length / clientesPorPagina);

  const mostrarAlerta = (mensagem, tipo) => {
    setAlerta({ mensagem, tipo });
    setTimeout(() => {
      setAlerta(null);
    }, 3000);
  };

  const handleEditarInputChange = (event) => {
    const { name, value } = event.target;
    setClienteEditando({ ...clienteEditando, [name]: value });
  };

  const abrirModalEditar = (index) => {
    const indiceAbsoluto = paginaAtual * clientesPorPagina + index;
    setClienteEditando({ ...clientes[indiceAbsoluto], index: indiceAbsoluto });
    setModalEditarClienteVisivel(true);
  };

  const salvarEdicaoCliente = (event) => {
    event.preventDefault();
    if (!clienteEditando.telefone || !/^\d{11}$/.test(clienteEditando.telefone.replace(/\D/g, ''))) {
      mostrarAlerta('O telefone deve conter 11 dígitos.', 'danger');
      return;
    }
    if (!clienteEditando.nome) {
      mostrarAlerta('O campo Nome é obrigatório.', 'danger');
      return;
    }
    if (!clienteEditando.dataNascimento) {
      mostrarAlerta('A Data de Nascimento é obrigatória.', 'danger');
      return;
    }
    const novosClientes = [...clientes];
    novosClientes[clienteEditando.index] = {
      cpf: clienteEditando.cpf,
      telefone: clienteEditando.telefone,
      nome: clienteEditando.nome,
      dataNascimento: clienteEditando.dataNascimento,
    };
    setClientes(novosClientes);
    setModalEditarClienteVisivel(false);
    mostrarAlerta('Cliente atualizado com sucesso!', 'success');
  };

  const abrirModalDeletar = (index) => {
    setModalDeletarClienteVisivel(paginaAtual * clientesPorPagina + index);
  };

  const deletarCliente = () => {
    const novosClientes = clientes.filter((_, index) => index !== modalDeletarClienteVisivel);
    setClientes(novosClientes);
    setModalDeletarClienteVisivel(null);
    mostrarAlerta('Cliente excluído com sucesso!', 'success');
    setPaginaAtual(0);
  };

  const proximaPagina = () => {
    if (paginaAtual < totalPaginas - 1) {
      setPaginaAtual(paginaAtual + 1);
    }
  };

  const paginaAnterior = () => {
    if (paginaAtual > 0) {
      setPaginaAtual(paginaAtual - 1);
    }
  };

  const clientesDaPagina = clientes.slice(
    paginaAtual * clientesPorPagina,
    (paginaAtual + 1) * clientesPorPagina
  );

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
        <h1 className="m-5 text-center">Lista de Clientes</h1>
        <div className="table-responsive">
          <table className="tabela col-xl-6 col-lg-8 col-md-10 m-auto mt-5 table table-striped">
            <thead>
              <tr>
                <th>CPF</th>
                <th>Telefone</th>
                <th>Nome</th>
                <th>Data Nascimento</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {clientesDaPagina.map((cliente, index) => (
                <tr key={index}>
                  <td>{cliente.cpf}</td>
                  <td>{cliente.telefone}</td>
                  <td>{cliente.nome}</td>
                  <td>{cliente.dataNascimento}</td>
                  <td>
                    <FontAwesomeIcon
                      icon={faPencil}
                      className="text-primary me-2"
                      onClick={() => abrirModalEditar(index)}
                      role="button"
                    />
                    <FontAwesomeIcon
                      icon={faTrash}
                      className="text-danger"
                      onClick={() => abrirModalDeletar(index)}
                      role="button"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot></tfoot>
          </table>
        </div>

        <div className="d-flex justify-content-center mt-3">
          <button
            className="btn btn-outline-secondary me-2"
            onClick={paginaAnterior}
            disabled={paginaAtual === 0}
          >
            Anterior
          </button>
          <span>Página {paginaAtual + 1} de {totalPaginas}</span>
          <button
            className="btn btn-outline-secondary ms-2"
            onClick={proximaPagina}
            disabled={paginaAtual === totalPaginas - 1}
          >
            Próximo
          </button>
        </div>

        {/* Modal de Edição */}
        {modalEditarClienteVisivel && (
          <div
            className="modal fade show"
            id="editarUsuario"
            tabIndex="-1"
            aria-labelledby="editarUsuarioLabel"
            aria-hidden="true"
            style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}
          >
            <div className="modal-dialog">
              <div className="modal-content modal-cadastro bg-dark text-light">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="editarUsuarioLabel">
                    Editar Cliente
                  </h1>
                  <button
                    type="button"
                    className="btn-close btn-close-white"
                    onClick={() => setModalEditarClienteVisivel(false)}
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body modal-cadastro bg-dark">
                  <form onSubmit={salvarEdicaoCliente}>
                    <div className="cadastro card bg-dark border-light">
                      <label htmlFor="editarCpfCliente" className="form-label text-light">CPF (opcional)</label>
                      <input
                        type="text"
                        className="form-control bg-secondary text-light"
                        id="editarCpfCliente"
                        name="cpf"
                        maxLength="14"
                        placeholder="000.000.000-00"
                        value={clienteEditando?.cpf || ''}
                        onChange={handleEditarInputChange}
                        onInput={(e) => {
                          let cpf = e.target.value;
                          cpf = cpf.replace(/\D/g, '');
                          cpf = cpf.replace(/^(\d{3})(\d)/, '$1.$2');
                          cpf = cpf.replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3');
                          cpf = cpf.replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3-$4');
                          e.target.value = cpf;
                        }}
                      />

                      <label htmlFor="editarTelefoneCliente" className="form-label text-light">Telefone</label>
                      <input
                        type="text"
                        className="form-control bg-secondary text-light"
                        id="editarTelefoneCliente"
                        name="telefone"
                        maxLength="16"
                        placeholder="(79) 9 9999-9999"
                        value={clienteEditando?.telefone || ''}
                        onChange={handleEditarInputChange}
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

                      <label htmlFor="editarNomeCliente" className="form-label text-light">Nome</label>
                      <input
                        type="text"
                        className="form-control bg-secondary text-light"
                        name="nome"
                        id="editarNomeCliente"
                        value={clienteEditando?.nome || ''}
                        onChange={handleEditarInputChange}
                        required
                      />

                      <label htmlFor="editarDataNascimento" className="form-label text-light">Data de Nascimento</label>
                      <input
                        type="date"
                        className="form-control bg-secondary text-light"
                        name="dataNascimento"
                        id="editarDataNascimento"
                        value={clienteEditando?.dataNascimento || ''}
                        onChange={handleEditarInputChange}
                        required
                      />
                    </div>

                    <button type="submit" className="btn btn-primary mt-3 enviar">
                      Atualizar
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal de Exclusão */}
        {modalDeletarClienteVisivel !== null && (
          <div
            className="modal fade show"
            id="deletarUsuario"
            tabIndex="-1"
            aria-labelledby="deletarUsuarioLabel"
            aria-hidden="true"
            style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}
          >
            <div className="modal-dialog">
              <div className="modal-content bg-dark text-light">
                <div className="modal-header bg-secondary">
                  <h5 className="modal-title">Deseja realmente excluir?</h5>
                  <button
                    type="button"
                    className="btn-close btn-close-white"
                    onClick={() => setModalDeletarClienteVisivel(null)}
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-footer bg-dark">
                  <button className="btn btn-success col-5" onClick={deletarCliente}>
                    Sim
                  </button>
                  <button
                    className="btn btn-danger col-5"
                    onClick={() => setModalDeletarClienteVisivel(null)}
                  >
                    Não
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default ListarClientes;