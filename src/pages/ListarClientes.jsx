import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import NavBar from '../components/NavBar';
import { api } from '../api/axios'; 

function ListarClientes() {
  const [clientes, setClientes] = useState([]);
  const [clienteEditando, setClienteEditando] = useState(null);
  const [modalEditarClienteVisivel, setModalEditarClienteVisivel] = useState(false);
  const [modalDeletarClienteVisivel, setModalDeletarClienteVisivel] = useState(null);
  const [modalVerMaisClienteVisivel, setModalVerMaisClienteVisivel] = useState(false);
  const [clienteParaVerMais, setClienteParaVerMais] = useState(null);
  const [alerta, setAlerta] = useState(null);
  const [paginaAtual, setPaginaAtual] = useState(0);
  const clientesPorPagina = 5;
  
  useEffect(() => {
    // Busca os clientes da API apenas uma vez na montagem
    api.get('/users').then((response) => {
      console.log("Dados recebidos da API:", response.data);
      
      // Simulação de produtos para adicionar a cada cliente
      const productsSimulated = [
        { name: 'Notebook Gamer', purchaseDate: '2023-01-20' },
        { name: 'Mouse Sem Fio', purchaseDate: '2023-01-25' },
        { name: 'Teclado Mecânico', purchaseDate: '2023-02-10' },
        { name: 'Smartphone Pro Max', purchaseDate: '2023-03-01' },
        { name: 'Fone de Ouvido Bluetooth', purchaseDate: '2023-03-05' },
        { name: 'Monitor Ultrawide', purchaseDate: '2023-04-10' },
        { name: 'Câmera DSLR', purchaseDate: '2022-12-01' },
        { name: 'Lente 50mm', purchaseDate: '2023-01-15' },
        { name: 'Tripé Profissional', purchaseDate: '2023-02-01' },
        { name: 'Smartwatch Esportivo', purchaseDate: '2023-05-10' },
      ];

      const clientesComProdutos = response.data.map((clienteApi) => {
        // Embaralha e pega uma quantidade aleatória de produtos para cada cliente
        const shuffledProducts = [...productsSimulated].sort(() => 0.5 - Math.random()); // Cria uma cópia antes de embaralhar
        const numberOfProducts = Math.floor(Math.random() * (productsSimulated.length / 2)) + 1; // Pelo menos 1 produto
        const assignedProducts = shuffledProducts.slice(0, numberOfProducts);

        return {
          cpf: clienteApi.id, 
          telefone: clienteApi.phone,
          nome: clienteApi.name,
          dataNascimento: clienteApi.birthDate ? new Date(clienteApi.birthDate).toLocaleDateString('pt-BR') : '-',
          productsPurchased: assignedProducts, 
        };
      });
      setClientes(clientesComProdutos);
    }).catch(error => {
      console.error("Erro ao buscar clientes da API:", error);
      mostrarAlerta("Erro ao carregar clientes. Tente novamente.", "danger");
    });
  }, []); // Array de dependências vazio para rodar apenas uma vez na montagem

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

  const abrirModalEditar = (absoluteIndex) => {
    console.log('Abrindo modal de edição para o índice absoluto:', absoluteIndex);
    setClienteEditando({ ...clientes[absoluteIndex], index: absoluteIndex });
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
      productsPurchased: clienteEditando.productsPurchased, 
    };
    setClientes(novosClientes);
    setModalEditarClienteVisivel(false);
    mostrarAlerta('Cliente atualizado com sucesso!', 'success');
  };

  const abrirModalDeletar = (absoluteIndex) => {
    console.log('Abrindo modal de exclusão para o índice absoluto:', absoluteIndex);
    setModalDeletarClienteVisivel(absoluteIndex);
  };

  const abrirModalVerMais = (absoluteIndex) => {
    console.log('Abrindo modal "Ver Mais" para o índice absoluto:', absoluteIndex);
    setClienteParaVerMais(clientes[absoluteIndex]); 
    setModalVerMaisClienteVisivel(true); 
  };

  const deletarCliente = () => {
    const novosClientes = clientes.filter((_, index) => index !== modalDeletarClienteVisivel);
    setClientes(novosClientes);
    setModalDeletarClienteVisivel(null);
    mostrarAlerta('Cliente excluído com sucesso!', 'success');
    if (paginaAtual > 0 && novosClientes.length <= paginaAtual * clientesPorPagina) {
        setPaginaAtual(paginaAtual - 1);
    }
  };

  const proximaPagina = () => {
    const totalPaginasCalculadas = Math.ceil(clientes.length / clientesPorPagina);
    if (paginaAtual < totalPaginasCalculadas - 1) {
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

  const totalPaginasCalculadas = Math.ceil(clientes.length / clientesPorPagina);

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
                <th>Produtos Comprados</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {clientesDaPagina.map((cliente) => {
                const absoluteIndex = clientes.indexOf(cliente);
                console.log(`Rendering cliente: ${cliente.nome}, Page Index: ${clientesDaPagina.indexOf(cliente)}, Absolute Index: ${absoluteIndex}`);
                console.log(`Isso é o mesmo objeto na lista global? ${clientes[absoluteIndex] === cliente}`);

                return (
                  <tr key={cliente.cpf}> 
                    <td>{cliente.cpf}</td>
                    <td>{cliente.telefone}</td>
                    <td>{cliente.nome}</td>
                    <td>{cliente.dataNascimento}</td>
                    <td className='text-primary' onClick={() => abrirModalVerMais(absoluteIndex)} role="button">
                      ver mais...
                    </td>
                    <td>
                      <FontAwesomeIcon
                        icon={faPencil}
                        className="text-primary me-2"
                        onClick={() => abrirModalEditar(absoluteIndex)}
                        role="button"
                      />
                      <FontAwesomeIcon
                        icon={faTrash}
                        className="text-danger"
                        onClick={() => abrirModalDeletar(absoluteIndex)}
                        role="button"
                      />
                    </td>
                  </tr>
                );
              })}
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
          <span>Página {paginaAtual + 1} de {totalPaginasCalculadas}</span>
          <button
            className="btn btn-outline-secondary ms-2"
            onClick={proximaPagina}
            disabled={paginaAtual === totalPaginasCalculadas - 1}
          >
            Próximo
          </button>
        </div>

        {/* Modal de Ver Mais */}
        {modalVerMaisClienteVisivel && clienteParaVerMais && (
          <div
            className="modal fade show"
            id="verMaisCliente"
            tabIndex="-1"
            aria-labelledby="verMaisClienteLabel"
            aria-hidden="true"
            style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}
          >
            <div className="modal-dialog">
              <div className="modal-content modal-cadastro bg-light text-dark">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="verMaisClienteLabel">
                    Produtos Comprados por {clienteParaVerMais.nome}
                  </h1>
                  <button
                    type="button"
                    className="btn-close btn-close-dark"
                    onClick={() => setModalVerMaisClienteVisivel(false)}
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body modal-cadastro bg-lihght">
                  {clienteParaVerMais.productsPurchased && clienteParaVerMais.productsPurchased.length > 0 ? (
                    <ul className="list-group list-group-flush">
                      {clienteParaVerMais.productsPurchased.map((produto, prodIndex) => (
                        <li key={prodIndex} className="list-group-item bg-light text-dark border-secondary">
                          <strong>{produto.name}</strong> - Data da Compra: {new Date(produto.purchaseDate).toLocaleDateString('pt-BR')}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>Nenhum produto comprado por este cliente.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

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