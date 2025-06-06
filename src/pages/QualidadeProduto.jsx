import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import { products } from '../api/axios'; // Importe sua instância 'products'
import './css/qualidadeProduto.css';

function QualidadeProduto() {
  const [produtoSelecionado, setProdutoSelecionado] = useState('');
  const [notaQualidade, setNotaQualidade] = useState(3);
  const [comentario, setComentario] = useState('');
  const [sugestoesMelhoria, setSugestoesMelhoria] = useState('');
  const [identificadorCliente, setIdentificadorCliente] = useState('');
  const [alerta, setAlerta] = useState(null);

  const [produtosDisponiveis, setProdutosDisponiveis] = useState([]);
  const [loadingProdutos, setLoadingProdutos] = useState(true);
  const [errorProdutos, setErrorProdutos] = useState(null);

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        setLoadingProdutos(true);
        setErrorProdutos(null);

        // Não precisa mais do products.getUri, ele era para debug
        // console.log("Tentando carregar produtos de:", products.getUri({ url: '/products' })); 
        
        const response = await products.get('/products');
        
        // console.log("Resposta completa da API de produtos:", response); // Deixe para debug se precisar
        // console.log("Dados recebidos da API (response.data):", response.data); // Deixe para debug se precisar

        // A FakeStoreAPI retorna um array direto de produtos.
        // Cada produto tem 'id' e 'title' (não 'nome').
        if (Array.isArray(response.data)) {
          // Mapeamos para garantir que o objeto de produto tenha 'id' e 'nome'
          // como esperado pelo restante do componente.
          const mappedProducts = response.data.map(item => ({
            id: item.id.toString(), // Garante que o ID seja string, como esperamos no select
            nome: item.title, // Usa 'title' da API como 'nome' no nosso frontend
          }));
          setProdutosDisponiveis(mappedProducts);
        } else {
          console.error("Formato inesperado da resposta da API de produtos:", response.data);
          setErrorProdutos("Formato de dados inesperado da API. Consulte o console.");
        }

      } catch (err) {
        console.error("Erro ao carregar produtos:", err);
        if (axios.isAxiosError(err)) { // Verifica se é um erro do Axios
          if (err.response) {
            setErrorProdutos(`Erro da API: ${err.response.status} - ${err.response.data?.message || 'Ocorreu um erro'}`);
          } else if (err.request) {
            setErrorProdutos("Nenhuma resposta do servidor. Verifique se o backend está online e a URL está correta.");
          } else {
            setErrorProdutos("Erro ao configurar a requisição. Verifique o console.");
          }
        } else {
          setErrorProdutos("Não foi possível carregar a lista de produtos. Verifique sua conexão ou a URL da API.");
        }
      } finally {
        setLoadingProdutos(false);
      }
    };

    fetchProdutos();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setAlerta(null);

    if (!produtoSelecionado) {
      setAlerta({ tipo: 'danger', mensagem: 'Por favor, selecione um produto ou serviço.' });
      return;
    }
    if (!comentario.trim() && !sugestoesMelhoria.trim()) {
      setAlerta({ tipo: 'danger', mensagem: 'Por favor, insira um comentário ou sugestão de melhoria.' });
      return;
    }

    // O nome do produto já será pego do 'produtosDisponiveis' que já foi mapeado
    const nomeDoProduto = produtosDisponiveis.find(p => p.id === produtoSelecionado)?.nome || 'Produto Desconhecido';

    const novoFeedback = {
      id: Date.now(),
      produto: nomeDoProduto,
      nota: notaQualidade,
      comentario: comentario.trim(),
      sugestoes: sugestoesMelhoria.trim(),
      cliente: identificadorCliente.trim(),
      dataRegistro: new Date().toLocaleString(),
    };

    try {
      const feedbacksExistentes = JSON.parse(localStorage.getItem('feedbacksQualidadeProduto')) || [];
      feedbacksExistentes.push(novoFeedback);
      localStorage.setItem('feedbacksQualidadeProduto', JSON.stringify(feedbacksExistentes));

      setAlerta({ tipo: 'success', mensagem: 'Feedback de qualidade registrado com sucesso!' });
      setProdutoSelecionado('');
      setNotaQualidade(3);
      setComentario('');
      setSugestoesMelhoria('');
      setIdentificadorCliente('');
    } catch (error) {
      console.error('Erro ao salvar feedback no localStorage:', error);
      setAlerta({ tipo: 'danger', mensagem: 'Ocorreu um erro ao registrar o feedback.' });
    }
  };

  return (
    <>
      <NavBar />
      <div className="container mt-4 mb-5">
        <h1 className="mb-4">Feedback de Qualidade do Produto/Serviço</h1>
        <hr className="mb-4" />

        {alerta && (
          <div
            className={`alert alert-${alerta.tipo} alert-dismissible fade show`}
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

        <div className="card p-4 shadow-sm">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="produtoSelecionado" className="form-label">
                Produto/Serviço
              </label>
              {loadingProdutos && (
                <div className="text-center">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Carregando produtos...</span>
                  </div>
                  <p className="text-muted mt-2">Carregando produtos...</p>
                </div>
              )}
              {errorProdutos && (
                <div className="alert alert-danger" role="alert">
                  {errorProdutos}
                </div>
              )}
              {!loadingProdutos && !errorProdutos && (
                <select
                  className="form-select"
                  id="produtoSelecionado"
                  value={produtoSelecionado}
                  onChange={(e) => setProdutoSelecionado(e.target.value)}
                  required
                  disabled={produtosDisponiveis.length === 0}
                >
                  <option value="">Selecione um produto/serviço</option>
                  {produtosDisponiveis.map((produto) => (
                    // Agora 'produto' já tem as propriedades 'id' e 'nome' corretas
                    <option key={produto.id} value={produto.id}>
                      {produto.nome}
                    </option>
                  ))}
                </select>
              )}
              {!loadingProdutos && !errorProdutos && produtosDisponiveis.length === 0 && (
                <p className="text-muted mt-2">Nenhum produto disponível.</p>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="notaQualidade" className="form-label d-block">
                Nota de Qualidade: <span className="badge bg-primary">{notaQualidade}</span>
              </label>
              <input
                type="range"
                className="form-range"
                id="notaQualidade"
                min="1"
                max="5"
                step="1"
                value={notaQualidade}
                onChange={(e) => setNotaQualidade(Number(e.target.value))}
              />
              <div className="d-flex justify-content-between text-muted small mt-1">
                <span>Péssimo</span>
                <span>Ruim</span>
                <span>Regular</span>
                <span>Bom</span>
                <span>Excelente</span>
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="comentario" className="form-label">Comentário Detalhado</label>
              <textarea
                className="form-control"
                id="comentario"
                rows="3"
                value={comentario}
                onChange={(e) => setComentario(e.target.value)}
                placeholder="Descreva sua experiência com a qualidade do produto/serviço..."
              ></textarea>
            </div>

            <div className="mb-3">
              <label htmlFor="sugestoesMelhoria" className="form-label">Sugestões de Melhoria</label>
              <textarea
                className="form-control"
                id="sugestoesMelhoria"
                rows="3"
                value={sugestoesMelhoria}
                onChange={(e) => setSugestoesMelhoria(e.target.value)}
                placeholder="O que poderia ser melhorado?"
              ></textarea>
            </div>

            <div className="mb-3">
              <label htmlFor="identificadorCliente" className="form-label">Identificador do Cliente (Opcional)</label>
              <input
                type="text"
                className="form-control"
                id="identificadorCliente"
                value={identificadorCliente}
                onChange={(e) => setIdentificadorCliente(e.target.value)}
                placeholder="Nome, ID ou E-mail do cliente"
              />
            </div>

            <button type="submit" className="btn btn-primary mt-3" disabled={loadingProdutos}>
              Registrar Feedback
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default QualidadeProduto;