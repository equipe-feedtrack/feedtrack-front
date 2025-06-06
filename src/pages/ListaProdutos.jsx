import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { products } from '../api/axios'; // Assumindo que 'products' é sua instância Axios
import NavBar from '../components/NavBar';
import axios from 'axios';

// Se as categorias forem fixas e não vierem da API, defina-as aqui:
// const CATEGORIAS_FIXAS = [
//   'Todas',
//   'Esportivo',
//   'Casual',
//   'Feminino',
//   'Masculino',
//   'Infantil',
//   'Acessórios',
//   'Eletrônicos'
// ];

function ListaProdutos() {
  const [produtosOriginais, setProdutosOriginais] = useState([]);
  const [produtosExibidos, setProdutosExibidos] = useState([]);
  const [termoBusca, setTermoBusca] = useState('');
  const [categoriaFiltro, setCategoriaFiltro] = useState('Todas'); // Estado para o filtro de categoria
  const [categoriasDisponiveis, setCategoriasDisponiveis] = useState([]); // Estado para categorias dinâmicas
  const [produtoEditando, setProdutoEditando] = useState(null);
  const [modalEditarProdutoVisivel, setModalEditarProdutoVisivel] = useState(false);
  const [modalDeletarProdutoVisivel, setModalDeletarProdutoVisivel] = useState(null);
  const [alerta, setAlerta] = useState(null);
  const [paginaAtual, setPaginaAtual] = useState(0);
  const produtosPorPagina = 5;

  // --- Funções de Busca ---

  // Função para buscar os produtos da API e extrair categorias
  const fetchProducts = async () => {
    try {
      const response = await products.get('/products');
      const fetchedProducts = response.data.map((product) => ({
        codigo: product.id,
        nome: product.title,
        setor: product.category, // Assumindo que 'product.category' é a categoria
        dataEntrada: product.date_added ? new Date(product.date_added).toLocaleDateString('pt-BR') : '-',
      }));
      setProdutosOriginais(fetchedProducts);

      // Extrai categorias únicas dos produtos e adiciona 'Todas'
      const uniqueCategories = ['Todas', ...new Set(fetchedProducts.map(p => p.setor))];
      setCategoriasDisponiveis(uniqueCategories);

      // Se estivesse usando CATEGORIAS_FIXAS:
      // setCategoriasDisponiveis(CATEGORIAS_FIXAS);

    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
      mostrarAlerta("Erro ao carregar produtos. Tente novamente.", "danger");
    }
  };

  // --- Effects ---

  // Carrega produtos (e categorias) na montagem do componente
  useEffect(() => {
    fetchProducts();
  }, []);

  // Aplica filtro e paginação quando termo de busca, categoria ou lista original mudam
  useEffect(() => {
    let filtered = produtosOriginais.filter(produto =>
      produto.nome.toLowerCase().includes(termoBusca.toLowerCase()) ||
      produto.setor.toLowerCase().includes(termoBusca.toLowerCase()) ||
      produto.codigo.toString().includes(termoBusca.toLowerCase())
    );

    if (categoriaFiltro !== 'Todas') {
      filtered = filtered.filter(produto =>
        produto.setor.toLowerCase() === categoriaFiltro.toLowerCase()
      );
    }

    setProdutosExibidos(filtered);
    setPaginaAtual(0); // Reseta a página para 0 toda vez que o filtro muda
  }, [termoBusca, categoriaFiltro, produtosOriginais]);

  // --- Lógica de Paginação ---

  const totalPaginas = Math.ceil(produtosExibidos.length / produtosPorPagina);

  const produtosDaPagina = produtosExibidos.slice(
    paginaAtual * produtosPorPagina,
    (paginaAtual + 1) * produtosPorPagina
  );

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

  // --- Lógica de Alerta, Edição e Exclusão ---

  const mostrarAlerta = (mensagem, tipo) => {
    setAlerta({ mensagem, tipo });
    setTimeout(() => {
      setAlerta(null);
    }, 3000);
  };

  const handleEditarInputChange = (event) => {
    const { name, value } = event.target;
    setProdutoEditando({ ...produtoEditando, [name]: value });
  };

  const abrirModalEditar = (indexNaPagina) => {
    const produtoSelecionado = produtosDaPagina[indexNaPagina];
    const produtoParaEditar = produtosOriginais.find(p => p.codigo === produtoSelecionado.codigo);
    setProdutoEditando({ ...produtoParaEditar });
    setModalEditarProdutoVisivel(true);
  };

  const salvarEdicaoProduto = (event) => {
    event.preventDefault();
    if (!produtoEditando.codigo || !produtoEditando.nome || !produtoEditando.setor || !produtoEditando.dataEntrada) {
      mostrarAlerta('Todos os campos do produto são obrigatórios.', 'danger');
      return;
    }

    // Simulação: atualiza o produto localmente (substitua pela chamada à API)
    const novosProdutosOriginais = produtosOriginais.map(p =>
      p.codigo === produtoEditando.codigo ? produtoEditando : p
    );
    setProdutosOriginais(novosProdutosOriginais);

    setModalEditarProdutoVisivel(false);
    mostrarAlerta('Produto atualizado com sucesso!', 'success');
  };

  const abrirModalDeletar = (indexNaPagina) => {
    const produtoSelecionado = produtosDaPagina[indexNaPagina];
    setModalDeletarProdutoVisivel(produtoSelecionado);
  };

  const deletarProduto = () => {
    const produtoIdParaDeletar = modalDeletarProdutoVisivel.codigo;

    const deletarProdutoApi = async (codigo) => {
      try {
        await axios.delete(`https://fakestoreapi.com/products/${codigo}`);
      } catch (error) {
        console.error("Erro ao deletar produto:", error);
        mostrarAlerta("Erro ao excluir produto. Tente novamente.", "danger");
        return;
      }
    };

    deletarProdutoApi(produtoIdParaDeletar);

    const novosProdutosOriginais = produtosOriginais.filter(p => p.codigo !== produtoIdParaDeletar);
    setProdutosOriginais(novosProdutosOriginais);

    setModalDeletarProdutoVisivel(null);
    mostrarAlerta('Produto excluído com sucesso!', 'success');
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

        <h1 className="m-5 text-center">Lista de Produtos</h1>

        {/* --- Área de Busca e Filtro --- */}
        <div className="d-flex justify-content-center mb-3 flex-wrap">
          <input
            type="text"
            className="form-control me-2 mb-2"
            style={{ maxWidth: '300px' }}
            placeholder="Pesquisar produto..."
            value={termoBusca}
            onChange={(e) => setTermoBusca(e.target.value)}
          />
          <select
            className="form-select mb-2"
            style={{ maxWidth: '200px' }}
            value={categoriaFiltro}
            onChange={(e) => setCategoriaFiltro(e.target.value)}
          >
            {categoriasDisponiveis.map(categoria => (
              <option key={categoria} value={categoria}>
                {categoria === 'Todas' ? 'Todas as Categorias' : categoria}
              </option>
            ))}
          </select>
        </div>

        {/* --- Tabela de Produtos --- */}
        <div className="table-responsive">
          <table className="tabela col-xl-6 col-lg-8 col-md-10 m-auto mt-5 table table-striped">
            <thead>
              <tr>
                <th>Código</th>
                <th>Nome</th>
                <th>Categoria</th>
                <th>Data Entrada</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {produtosDaPagina.length > 0 ? (
                produtosDaPagina.map((produto) => (
                  <tr key={produto.codigo}>
                    <td>{produto.codigo}</td>
                    <td>{produto.nome}</td>
                    <td>{produto.setor}</td>
                    <td>{produto.dataEntrada}</td>
                    <td>
                      <FontAwesomeIcon
                        icon={faPencil}
                        className="text-primary me-2"
                        onClick={() => abrirModalEditar(produtosDaPagina.indexOf(produto))}
                        role="button"
                      />
                      <FontAwesomeIcon
                        icon={faTrash}
                        className="text-danger"
                        onClick={() => abrirModalDeletar(produtosDaPagina.indexOf(produto))}
                        role="button"
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center">Nenhum produto encontrado.</td>
                </tr>
              )}
            </tbody>
            <tfoot></tfoot>
          </table>
        </div>

        {/* --- Controles de Paginação --- */}
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
            disabled={paginaAtual === totalPaginas - 1 || totalPaginas === 0}
          >
            Próximo
          </button>
        </div>

        {/* --- Modal de Edição --- */}
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
                        required
                        disabled
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
                        required
                      />

                      <label htmlFor="editarSetorProduto" className="form-label text-light">
                        Setor (Categoria)
                      </label>
                      {/* ALTERAÇÃO AQUI: DE INPUT PARA SELECT */}
                      <select
                        className="form-select bg-secondary text-light"
                        name="setor"
                        id="editarSetorProduto"
                        value={produtoEditando?.setor || ''}
                        onChange={handleEditarInputChange}
                        required
                      >
                        <option value="" disabled>Selecione uma categoria</option> {/* Opção padrão */}
                        {categoriasDisponiveis
                          .filter(cat => cat !== 'Todas') // Remove 'Todas' da lista de opções editáveis
                          .map(categoria => (
                            <option key={categoria} value={categoria}>
                              {categoria}
                            </option>
                          ))}
                      </select>

                      <label htmlFor="editarDataEntradaProduto" className="form-label text-light">
                        Data de entrada
                      </label>
                      <input
                        type="date"
                        className="form-control bg-secondary text-light"
                        name="dataEntrada"
                        id="editarDataEntradaProduto"
                        required
                        value={produtoEditando?.dataEntrada.split('/').reverse().join('-') || ''}
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

        {/* --- Modal de Exclusão --- */}
        {modalDeletarProdutoVisivel !== null && (
          <div
            className="modal fade show"
            id="deletarProdutoModal"
            tabIndex="-1"
            aria-labelledby="deletarProdutoModalLabel"
            aria-hidden="true"
            style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
          >
            <div className="modal-dialog">
              <div className="modal-content bg-light text-dark">
                <div className="modal-header">
                  <h5 className="modal-title">Deseja realmente excluir o produto {modalDeletarProdutoVisivel.nome}?</h5>
                  <button
                    type="button"
                    className="btn-close btn-close-dark"
                    onClick={() => setModalDeletarProdutoVisivel(null)}
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-footer bg-light">
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
      </main>
    </div>
  );
}

export default ListaProdutos;