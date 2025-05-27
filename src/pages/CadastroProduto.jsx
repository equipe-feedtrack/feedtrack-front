import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import NavBar from '../components/NavBar';
import {products} from '../api/axios';

function CadastroProduto() {
  const [produtos, setProdutos] = useState([]);
  const [novoProduto, setNovoProduto] = useState({ codigo: '', nome: '', setor: '', dataEntrada: '' });
  const [produtoEditando, setProdutoEditando] = useState(null);
  const [modalNovoProdutoVisivel, setModalNovoProdutoVisivel] = useState(false);
  const [modalEditarProdutoVisivel, setModalEditarProdutoVisivel] = useState(false);
  const [modalDeletarProdutoVisivel, setModalDeletarProdutoVisivel] = useState(null);
  const [alerta, setAlerta] = useState(null);
  const [paginaAtual, setPaginaAtual] = useState(0);
  const produtosPorPagina = 5;
  const totalPaginas = Math.ceil(produtos.length / produtosPorPagina);

  products.get('/products').then((response)=>{
    const products = response.data.map((product)=>({
      codigo: product.id,
      nome: product.title,
      setor: product.category,
      dataEntrada: product.date_added ? new Date(product.date_added).toLocaleDateString('pt-BR') : '-',
    }))

    setProdutos(products)
  })


  const produtosDaPagina = produtos.slice(
    paginaAtual * produtosPorPagina,
    (paginaAtual + 1) * produtosPorPagina
  );

  const mostrarAlerta = (mensagem, tipo) => {
    setAlerta({ mensagem, tipo });
    setTimeout(() => {
      setAlerta(null);
    }, 3000);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNovoProduto({ ...novoProduto, [name]: value });
  };

  const handleEditarInputChange = (event) => {
    const { name, value } = event.target;
    setProdutoEditando({ ...produtoEditando, [name]: value });
  };

  const adicionarProduto = (event) => {
    event.preventDefault();
    if (!novoProduto.codigo) {
      mostrarAlerta('O Código do produto é obrigatório.', 'danger');
      return;
    }
    if (!novoProduto.nome) {
      mostrarAlerta('O Nome do produto é obrigatório.', 'danger');
      return;
    }
    if (!novoProduto.setor) {
      mostrarAlerta('O Setor é obrigatório.', 'danger');
      return;
    }
    if (!novoProduto.dataEntrada) {
      mostrarAlerta('A Data de entrada é obrigatória.', 'danger');
      return;
    }
    setProdutos([...produtos, novoProduto]);
    setNovoProduto({ codigo: '', nome: '', setor: '', dataEntrada: '' });
    setModalNovoProdutoVisivel(false);
    mostrarAlerta('Produto cadastrado com sucesso!', 'success');
    setPaginaAtual(0); // Resetar para a primeira página após adicionar
  };

  const abrirModalEditar = (index) => {
    const indiceAbsoluto = paginaAtual * produtosPorPagina + index;
    setProdutoEditando({ ...produtos[indiceAbsoluto], index: indiceAbsoluto });
    setModalEditarProdutoVisivel(true);
  };

  const salvarEdicaoProduto = (event) => {
    event.preventDefault();
    if (!produtoEditando.codigo) {
      mostrarAlerta('O Código do produto é obrigatório.', 'danger');
      return;
    }
    if (!produtoEditando.nome) {
      mostrarAlerta('O Nome do produto é obrigatório.', 'danger');
      return;
    }
    if (!produtoEditando.setor) {
      mostrarAlerta('O Setor é obrigatório.', 'danger');
      return;
    }
    if (!produtoEditando.dataEntrada) {
      mostrarAlerta('A Data de entrada é obrigatória.', 'danger');
      return;
    }
    const novosProdutos = [...produtos];
    novosProdutos[produtoEditando.index] = {
      codigo: produtoEditando.codigo,
      nome: produtoEditando.nome,
      setor: produtoEditando.setor,
      dataEntrada: produtoEditando.dataEntrada,
    };
    setProdutos(novosProdutos);
    setModalEditarProdutoVisivel(false);
    mostrarAlerta('Produto atualizado com sucesso!', 'success');
  };

  const abrirModalDeletar = (index) => {
    setModalDeletarProdutoVisivel(paginaAtual * produtosPorPagina + index);
  };

  const deletarProduto = () => {
    const novosProdutos = produtos.filter((_, index) => index !== modalDeletarProdutoVisivel);
    setProdutos(novosProdutos);
    setModalDeletarProdutoVisivel(null);
    mostrarAlerta('Produto excluído com sucesso!', 'success');
    setPaginaAtual(0); // Resetar para a primeira página após deletar
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
        <h1 className="m-5 text-center">Cadastro de Produto</h1>
        <button
          type="button"
          className="btn btn-primary d-block m-auto"
          onClick={() => setModalNovoProdutoVisivel(true)}
        >
          Novo Produto
        </button>

        {/* Modal de Cadastro */}
        {modalNovoProdutoVisivel && (
          <div
            className="modal fade show"
            id="exampleModal"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
            style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}
          >
            <div className="modal-dialog">
              <div className="modal-content modal-cadastro bg-dark text-light">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="exampleModalLabel">
                    Cadastrar novo Produto
                  </h1>
                  <button
                    type="button"
                    className="btn-close btn-close-white"
                    onClick={() => setModalNovoProdutoVisivel(false)}
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body modal-cadastro bg-dark">
                  <form onSubmit={adicionarProduto}>
                    <div className="cadastro card bg-dark border-light">
                      <label htmlFor="codProduto" className="form-label text-light">
                        Código do produto
                      </label>
                      <input
                        type="text"
                        className="form-control bg-secondary text-light"
                        id="codProduto"
                        name="codigo"
                        placeholder="Código do produto"
                        value={novoProduto.codigo}
                        onChange={handleInputChange}
                      />

                      <label htmlFor="nomeProduto" className="form-label text-light">
                        Nome do produto
                      </label>
                      <input
                        type="text"
                        className="form-control bg-secondary text-light"
                        id="nomeProduto"
                        name="nome"
                        placeholder="Nome do produto"
                        value={novoProduto.nome}
                        onChange={handleInputChange}
                      />

                      <label htmlFor="setorProduto" className="form-label text-light">
                        Setor
                      </label>
                      <input
                        type="text"
                        className="form-control bg-secondary text-light"
                        name="setor"
                        id="setorProduto"
                        placeholder="Setor"
                        value={novoProduto.setor}
                        onChange={handleInputChange}
                      />

                      <label htmlFor="dataEntradaProduto" className="form-label text-light">
                        Data de entrada
                      </label>
                      <input
                        type="date"
                        className="form-control bg-secondary text-light"
                        name="dataEntrada"
                        id="dataEntradaProduto"
                        required
                        value={novoProduto.dataEntrada}
                        onChange={handleInputChange}
                      />
                    </div>

                    <button type="submit" className="btn btn-success mt-3 enviar" id="liveAlertBtn">
                      Cadastrar
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal de Edição */}
        {modalEditarProdutoVisivel && (
          <div
            className="modal fade show"
            id="editarProdutoModal"
            tabIndex="-1"
            aria-labelledby="editarProdutoModalLabel"
            aria-hidden="true"
            style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}
          >
            <div className="modal-dialog">
              <div className="modal-content modal-cadastro bg-dark text-light">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="editarProdutoModalLabel">
                    Editar Produto
                  </h1>
                  <button
                    type="button"
                    className="btn-close btn-close-white"
                    onClick={() => setModalEditarProdutoVisivel(false)}
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body modal-cadastro bg-dark">
                  <form onSubmit={salvarEdicaoProduto}>
                    <div className="cadastro card bg-dark border-light">
                      <label htmlFor="editarCodProduto" className="form-label text-light">
                        Código do produto
                      </label>
                      <input
                        type="text"
                        className="form-control bg-secondary text-light"
                        id="editarCodProduto"
                        name="codigo"
                        placeholder="Código do produto"
                        value={produtoEditando?.codigo || ''}
                        onChange={handleEditarInputChange}
                      />

                      <label htmlFor="editarNomeProduto" className="form-label text-light">
                        Nome do produto
                      </label>
                      <input
                        type="text"
                        className="form-control bg-secondary text-light"
                        id="editarNomeProduto"
                        name="nome"
                        placeholder="Nome do produto"
                        value={produtoEditando?.nome || ''}
                        onChange={handleEditarInputChange}
                      />

                      <label htmlFor="editarSetorProduto" className="form-label text-light">
                        Setor
                      </label>
                      <input
                        type="text"
                        className="form-control bg-secondary text-light"
                        name="setor"
                        id="editarSetorProduto"
                        placeholder="Setor"
                        value={produtoEditando?.setor || ''}
                        onChange={handleEditarInputChange}
                      />

                      <label htmlFor="editarDataEntradaProduto" className="form-label text-light">
                        Data de entrada
                      </label>
                      <input
                        type="date"
                        className="form-control bg-secondary text-light"
                        name="dataEntrada"
                        id="editarDataEntradaProduto"
                        required
                        value={produtoEditando?.dataEntrada || ''}
                        onChange={handleEditarInputChange}
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
        {modalDeletarProdutoVisivel !== null && (
          <div
            className="modal fade show"
            id="deletarProdutoModal"
            tabIndex="-1"
            aria-labelledby="deletarProdutoModalLabel"
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
                    onClick={() => setModalDeletarProdutoVisivel(null)}
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-footer bg-dark">
                  <button className="btn btn-success col-5" onClick={deletarProduto}>
                    Sim
                  </button>
                  <button
                    className="btn btn-danger col-5"
                    onClick={() => setModalDeletarProdutoVisivel(null)}
                  >
                    Não
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="table-responsive">
          <table className="tabela col-xl-6 col-lg-8 col-md-10 m-auto mt-5 table table-striped">
            <thead>
              <tr>
                <th>Código</th>
                <th>Nome</th>
                <th>Setor</th>
                <th>Data Entrada</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {produtosDaPagina.map((produto, index) => (
                <tr key={index}>
                  <td>{produto.codigo}</td>
                  <td>{produto.nome}</td>
                  <td>{produto.setor}</td>
                  <td>{produto.dataEntrada}</td>
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
      </main>
    </div>
  );
}

export default CadastroProduto;