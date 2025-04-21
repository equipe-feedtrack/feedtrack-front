import React, { useState } from 'react';
import NavBar from '../components/NavBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';

function CadastroFuncionario() {
  const [funcionarios, setFuncionarios] = useState([
    { id: 1, nome: 'Letícia', cpf: '111.111.111-11', cargo: 'Vendedora', dataNascimento: '1996-04-20', tempoServico: '3 anos', imagem: '/img/imagem de leticia.jpg' },
    { id: 2, nome: 'Maria', cpf: '222.222.222-22', cargo: 'Vendedora/Caixa', dataNascimento: '2001-10-15', tempoServico: '2 anos', imagem: '/img/imagem de maria.jpg' },
    { id: 3, nome: 'João', cpf: '333.333.333-33', cargo: 'Vendedor/Gerente', dataNascimento: '1993-07-01', tempoServico: '7 anos', imagem: '/img/imagem de joão.jpg' },
    { id: 4, nome: 'Douglas', cpf: '444.444.444-44', cargo: 'Vendedor', dataNascimento: '2003-01-05', tempoServico: '1 ano', imagem: '/img/imagem de Douglas.jpg' },
  ]);
  const [novoFuncionario, setNovoFuncionario] = useState({
    cpf: '',
    nome: '',
    dataNascimento: '',
    cargo: '',
    imagem: null,
  });
  const [modalNovoFuncionarioVisivel, setModalNovoFuncionarioVisivel] = useState(false);
  const [alerta, setAlerta] = useState(null);
  const [funcionarioEditando, setFuncionarioEditando] = useState(null);
  const [modalEditarFuncionarioVisivel, setModalEditarFuncionarioVisivel] = useState(false);
  const [modalDeletarFuncionarioVisivel, setModalDeletarFuncionarioVisivel] = useState(null);

  const mostrarAlerta = (mensagem, tipo) => {
    setAlerta({ mensagem, tipo });
    setTimeout(() => {
      setAlerta(null);
    }, 3000);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNovoFuncionario({ ...novoFuncionario, [name]: value });
  };

  const handleImagemChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNovoFuncionario({ ...novoFuncionario, imagem: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const adicionarFuncionario = (event) => {
    event.preventDefault();
    if (!novoFuncionario.cpf || !/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(novoFuncionario.cpf)) {
      mostrarAlerta('O CPF deve ser válido.', 'danger');
      return;
    }
    if (!novoFuncionario.nome) {
      mostrarAlerta('O Nome é obrigatório.', 'danger');
      return;
    }
    if (!novoFuncionario.dataNascimento) {
      mostrarAlerta('A Data de Nascimento é obrigatória.', 'danger');
      return;
    }
    if (!novoFuncionario.cargo) {
      mostrarAlerta('O Cargo é obrigatório.', 'danger');
      return;
    }
    const novoId = funcionarios.length > 0 ? Math.max(...funcionarios.map(f => f.id)) + 1 : 1;
    setFuncionarios([...funcionarios, { ...novoFuncionario, id: novoId, imagem: novoFuncionario.imagem || '/img/default-user.png' }]);
    setNovoFuncionario({ cpf: '', nome: '', dataNascimento: '', cargo: '', imagem: null });
    setModalNovoFuncionarioVisivel(false);
    mostrarAlerta('Funcionário cadastrado com sucesso!', 'success');
  };

  const abrirModalEditar = (id) => {
    const funcionarioParaEditar = funcionarios.find(f => f.id === id);
    if (funcionarioParaEditar) {
      setFuncionarioEditando({ ...funcionarioParaEditar });
      setModalEditarFuncionarioVisivel(true);
    }
  };

  const handleEditarInputChange = (event) => {
    const { name, value } = event.target;
    setFuncionarioEditando({ ...funcionarioEditando, [name]: value });
  };

  const salvarEdicaoFuncionario = (event) => {
    event.preventDefault();
    if (!funcionarioEditando.cpf || !/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(funcionarioEditando.cpf)) {
      mostrarAlerta('O CPF deve ser válido.', 'danger');
      return;
    }
    if (!funcionarioEditando.nome) {
      mostrarAlerta('O Nome é obrigatório.', 'danger');
      return;
    }
    if (!funcionarioEditando.dataNascimento) {
      mostrarAlerta('A Data de Nascimento é obrigatória.', 'danger');
      return;
    }
    if (!funcionarioEditando.cargo) {
      mostrarAlerta('O Cargo é obrigatório.', 'danger');
      return;
    }
    const novosFuncionarios = funcionarios.map(f =>
      f.id === funcionarioEditando.id ? { ...funcionarioEditando } : f
    );
    setFuncionarios(novosFuncionarios);
    setModalEditarFuncionarioVisivel(false);
    mostrarAlerta('Funcionário atualizado com sucesso!', 'success');
  };

  const abrirModalDeletar = (id) => {
    setModalDeletarFuncionarioVisivel(id);
  };

  const deletarFuncionario = () => {
    const novosFuncionarios = funcionarios.filter(f => f.id !== modalDeletarFuncionarioVisivel);
    setFuncionarios(novosFuncionarios);
    setModalDeletarFuncionarioVisivel(null);
    mostrarAlerta('Funcionário excluído com sucesso!', 'success');
  };

  return (
    <div>
      <NavBar />
      <main className="col">
        <div id="liveAlertPlaceholder">
          {alerta && (
            <div className={`alert alert-${alerta.tipo} alert-dismissible fade show`} role="alert">
              {alerta.mensagem}
              <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
          )}
        </div>

        <div className="d-flex justify-content-between align-items-center mt-3 text-white">
          <h1 className='m-3'>Lista de Funcionários</h1>
          <button className="btn btn-success m-3" onClick={() => setModalNovoFuncionarioVisivel(true)}>
            <FontAwesomeIcon icon={faPlus} className="me-2" />
            <span className="d-none d-md-inline">Novo Funcionário</span>
          </button>
        </div>

        <div className="table-responsive mt-4 text-center">
          <table className="table table-dark table-striped">
            <thead>
              <tr>
                <th>Imagem</th>
                <th>Nome</th>
                <th>CPF</th>
                <th>Cargo</th>
                <th><span className="d-none d-md-inline">Data de</span> Nascimento</th>
                <th><span className="d-none d-md-inline">Tempo de</span> Serviço</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {funcionarios.map(funcionario => (
                <tr key={funcionario.id}>
                  <td>
                    <img
                      src={funcionario.imagem}
                      alt={funcionario.nome}
                      className="rounded-circle"
                      style={{ width: '30px', height: '30px', objectFit: 'cover' }}
                      onError={(e) => { e.target.onerror = null; e.target.src = "/img/default-user.png" }}
                    />
                  </td>
                  <td>{funcionario.nome}</td>
                  <td>{funcionario.cpf}</td>
                  <td>{funcionario.cargo}</td>
                  <td>{funcionario.dataNascimento}</td>
                  <td>{funcionario.tempoServico}</td>
                  <td>
                    <button className="btn btn-sm btn-primary me-2" onClick={() => abrirModalEditar(funcionario.id)}>
                      <FontAwesomeIcon icon={faPencil} />
                      <span className="d-none d-md-inline">Editar</span>
                    </button>
                    <button className="btn btn-sm btn-danger" onClick={() => abrirModalDeletar(funcionario.id)}>
                      <FontAwesomeIcon icon={faTrash} />
                      <span className="d-none d-md-inline">Excluir</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal de Cadastro de Funcionário */}
        {modalNovoFuncionarioVisivel && (
          <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-lg"> {/* Tornando o modal um pouco maior em telas maiores */}
              <div className="modal-content bg-dark text-light">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="exampleModalLabel">
                    Cadastrar novo funcionário
                  </h1>
                  <button
                    type="button"
                    className="btn-close btn-close-white"
                    onClick={() => setModalNovoFuncionarioVisivel(false)}
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <form onSubmit={adicionarFuncionario}>
                    <div className="row"> {/* Usando o sistema de grid do Bootstrap para organizar os campos */}
                      <div className="col-md-6 mb-3">
                        <label htmlFor="cpfUsuario" className="form-label text-light">CPF</label>
                        <input type="text" className="form-control bg-secondary text-light" id="cpfUsuario" name="cpf" maxLength="14" placeholder="000.000.000-00" value={novoFuncionario.cpf} onChange={handleInputChange} onInput={(e) => { let cpf = e.target.value; cpf = cpf.replace(/\D/g, ''); cpf = cpf.replace(/^(\d{3})(\d)/, '$1.$2'); cpf = cpf.replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3'); cpf = cpf.replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3-$4'); e.target.value = cpf; }} required />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label htmlFor="nomeUsuario" className="form-label text-light">Nome</label>
                        <input type="text" className="form-control bg-secondary text-light" name="nome" id="nomeUsuario" value={novoFuncionario.nome} onChange={handleInputChange} required />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label htmlFor="dataNasc" className="form-label text-light">Data de Nascimento</label>
                        <input type="date" className="form-control bg-secondary text-light" name="dataNascimento" id="dataNasc" value={novoFuncionario.dataNascimento} onChange={handleInputChange} required />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label htmlFor="cargFunc" className="form-label text-light">Cargo</label>
                        <select className="form-select bg-secondary text-light" name="cargo" id="cargFunc" value={novoFuncionario.cargo} onChange={handleInputChange} required>
                          <option value="">Selecione o cargo</option>
                          <option value="Vendedor">Vendedor</option>
                          <option value="Estoquista">Estoquista</option>
                          <option value="Operador de computador">Operador de computador</option>
                          <option value="Gerente">Gerente</option>
                        </select>
                      </div>
                      <div className="col-12 mb-3">
                        <label htmlFor="imagemFuncionario" className="form-label text-light">Imagem do Funcionário</label>
                        <input type="file" className="form-control bg-secondary text-light" id="imagemFuncionario" accept="image/*" onChange={handleImagemChange} />
                        {novoFuncionario.imagem && (
                          <img src={novoFuncionario.imagem} alt="Pré-visualização" className="mt-2" style={{ maxWidth: '100px', maxHeight: '100px' }} />
                        )}
                      </div>
                    </div>
                    <div className="modal-footer bg-dark border-top-0">
                      <button type="button" className="btn btn-secondary" onClick={() => setModalNovoFuncionarioVisivel(false)}>Cancelar</button>
                      <button type="submit" className="btn btn-success" id="liveAlertBtn">Cadastrar</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal de Edição de Funcionário */}
        {modalEditarFuncionarioVisivel && (
          <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-lg">
              <div className="modal-content bg-dark text-light">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="editarFuncionarioModalLabel">
                    Editar Funcionário
                  </h1>
                  <button type="button" className="btn-close btn-close-white" onClick={() => setModalEditarFuncionarioVisivel(false)} aria-label="Close"></button>
                </div>
                <div className="modal-body">
                  <form onSubmit={salvarEdicaoFuncionario}>
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label htmlFor="editarCpfUsuario" className="form-label text-light">CPF</label>
                        <input type="text" className="form-control bg-secondary text-light" id="editarCpfUsuario" name="cpf" maxLength="14" placeholder="000.000.000-00" value={funcionarioEditando?.cpf || ''} onChange={handleEditarInputChange} onInput={(e) => { let cpf = e.target.value; cpf = cpf.replace(/\D/g, ''); cpf = cpf.replace(/^(\d{3})(\d)/, '$1.$2'); cpf = cpf.replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3'); cpf = cpf.replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3-$4'); e.target.value = cpf; }} required />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label htmlFor="editarNomeUsuario" className="form-label text-light">Nome</label>
                        <input type="text" className="form-control bg-secondary text-light" name="nome" id="editarNomeUsuario" value={funcionarioEditando?.nome || ''} onChange={handleEditarInputChange} required />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label htmlFor="editarDataNasc" className="form-label text-light">Data de Nascimento</label>
                        <input type="date"
                        className="form-control bg-secondary text-light"
                        name="dataNascimento"
                        id="editarDataNasc"
                        value={funcionarioEditando?.dataNascimento || ''}
                        onChange={handleEditarInputChange}
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="editarCargFunc" className="form-label text-light">Cargo</label>
                      <select
                        className="form-select bg-secondary text-light"
                        name="cargo"
                        id="editarCargFunc"
                        value={funcionarioEditando?.cargo || ''}
                        onChange={handleEditarInputChange}
                        required
                      >
                        <option value="">Selecione o cargo</option>
                        <option value="Vendedor">Vendedor</option>
                        <option value="Estoquista">Estoquista</option>
                        <option value="Operador de computador">Operador de computador</option>
                        <option value="Gerente">Gerente</option>
                      </select>
                    </div>
                    <div className="col-12 mb-3">
                      {funcionarioEditando?.imagem && (
                        <div className="mt-3">
                          <img
                            src={funcionarioEditando.imagem}
                            alt="Pré-visualização"
                            style={{ maxWidth: '100px', maxHeight: '100px' }}
                          />
                        </div>
                      )}
                      <label htmlFor="editarImagemFuncionario" className="form-label text-light mt-3">
                        Alterar Imagem (Opcional)
                      </label>
                      <input
                        type="file"
                        className="form-control bg-secondary text-light"
                        id="editarImagemFuncionario"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              setFuncionarioEditando({ ...funcionarioEditando, imagem: reader.result });
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                    </div>
                  </div>
                  <div className="modal-footer bg-dark border-top-0">
                    <button type="button" className="btn btn-secondary" onClick={() => setModalEditarFuncionarioVisivel(false)}>
                      Cancelar
                    </button>
                    <button type="submit" className="btn btn-primary">
                      Salvar Alterações
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Confirmação de Exclusão */}
      {modalDeletarFuncionarioVisivel !== null && (
        <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content bg-dark text-light">
              <div className="modal-header bg-secondary">
                <h5 className="modal-title">Confirmar Exclusão</h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => setModalDeletarFuncionarioVisivel(null)}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                Tem certeza que deseja excluir este funcionário?
              </div>
              <div className="modal-footer bg-dark border-top-0">
                <button className="btn btn-secondary" onClick={() => setModalDeletarFuncionarioVisivel(null)}>
                  Cancelar
                </button>
                <button className="btn btn-danger" onClick={deletarFuncionario}>
                  Excluir
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

export default CadastroFuncionario;