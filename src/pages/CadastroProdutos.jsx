import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { products } from '../api/axios'; // Mantendo a importação da API

function CadastroProduto() {
  const [produtos, setProdutos] = useState([]);
  const [novoProduto, setNovoProduto] = useState({ codigo: '', nome: '', setor: '', dataEntrada: '' });
  const [produtoEditando, setProdutoEditando] = useState(null);
  const [modalEditarProdutoVisivel, setModalEditarProdutoVisivel] = useState(false);
  const [modalDeletarProdutoVisivel, setModalDeletarProdutoVisivel] = useState(null);
  const [alerta, setAlerta] = useState(null);
  const [paginaAtual, setPaginaAtual] = useState(0);
  const produtosPorPagina = 5;

  // UseEffect para buscar dados da API apenas uma vez ao montar o componente
  useEffect(() => {
    fetchProducts();
  }, []);

  // Função para buscar produtos (centralizada aqui)
  const fetchProducts = () => {
    products.get('/products')
      .then((response) => {
        const fetchedProducts = response.data.map((product) => ({
          codigo: product.id,
          nome: product.title,
          setor: product.category,
          dataEntrada: product.date_added ? new Date(product.date_added).toLocaleDateString('pt-BR') : '-',
        }));
        setProdutos(fetchedProducts);
      })
      .catch(error => {
        console.error("Erro ao buscar produtos:", error);
        mostrarAlerta("Erro ao carregar produtos. Tente novamente.", "danger");
      });
  };

  const totalPaginas = Math.ceil(produtos.length / produtosPorPagina);

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

    // Simulação: adiciona o produto localmente (substitua pela chamada à API)
    setProdutos(prevProdutos => [...prevProdutos, novoProduto]);
    setNovoProduto({ codigo: '', nome: '', setor: '', dataEntrada: '' });
    mostrarAlerta('Produto cadastrado com sucesso!', 'success');
    setPaginaAtual(0); // Resetar para a primeira página após adicionar
  };

  const abrirModalEditar = (indexNaPagina) => {
    const indiceAbsoluto = paginaAtual * produtosPorPagina + indexNaPagina;
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
    
    // Simulação: atualiza o produto localmente (substitua pela chamada à API)
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

  const abrirModalDeletar = (indexNaPagina) => {
    const indiceAbsoluto = paginaAtual * produtosPorPagina + indexNaPagina;
    setModalDeletarProdutoVisivel(indiceAbsoluto);
  };

  const deletarProduto = () => {
    // Simulação: deleta o produto localmente (substitua pela chamada à API)
    const novosProdutos = produtos.filter((_, index) => index !== modalDeletarProdutoVisivel);
    setProdutos(novosProdutos);
    setModalDeletarProdutoVisivel(null);
    mostrarAlerta('Produto excluído com sucesso!', 'success');
    // Ajusta a página atual se a última página ficar vazia
    if (paginaAtual > 0 && novosProdutos.length <= paginaAtual * produtosPorPagina) {
        setPaginaAtual(paginaAtual - 1);
    }
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
        
        {/* Formulário de Cadastro de Produto (agora parte da página principal) */}
        <div className="container mt-5">
            <div className="card bg-light text-dark border-light p-4">
                <h2 className="mb-4 text-center">Adicionar Novo Produto</h2>
                <form onSubmit={adicionarProduto}>
                    <div className="mb-3">
                        <label htmlFor="codProduto" className="form-label">Código do produto</label>
                        <input
                            type="text"
                            className="form-control bg-light text-dark"
                            id="codProduto"
                            name="codigo"
                            placeholder="Código do produto"
                            value={novoProduto.codigo}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="nomeProduto" className="form-label">Nome do produto</label>
                        <input
                            type="text"
                            className="form-control bg-light text-dark"
                            id="nomeProduto"
                            name="nome"
                            placeholder="Nome do produto"
                            value={novoProduto.nome}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="setorProduto" className="form-label">Setor</label>
                        <input
                            type="text"
                            className="form-control bg-light text-dark"
                            name="setor"
                            id="setorProduto"
                            placeholder="Setor"
                            value={novoProduto.setor}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="dataEntradaProduto" className="form-label">Data de entrada</label>
                        <input
                            type="date"
                            className="form-control bg-light text-dark"
                            name="dataEntrada"
                            id="dataEntradaProduto"
                            required
                            value={novoProduto.dataEntrada}
                            onChange={handleInputChange}
                        />
                    </div>
                    <button type="submit" className="btn btn-success w-100">
                        Cadastrar Produto
                    </button>
                </form>
            </div>
        </div>


       
      </main>
    </div>
  );
}

export default CadastroProduto;