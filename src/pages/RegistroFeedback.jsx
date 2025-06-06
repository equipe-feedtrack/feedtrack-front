import React, { useState } from 'react';
import NavBar from '../components/NavBar';

const RegistroFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [novoFeedback, setNovoFeedback] = useState({
    cliente: '',
    vendedor: '',
    produto: '',
    mensagem: '',
    data: '',
    prioridade: 'Baixa',
  });

  const [modalVisivel, setModalVisivel] = useState(false);
  const [modalRelatorioVisivel, setModalRelatorioVisivel] = useState(false);
  const [clienteSelecionado, setClienteSelecionado] = useState('');
  const [produtoSelecionado, setProdutoSelecionado] = useState('');
  const [mensagemRelatorio, setMensagemRelatorio] = useState('');
  const [mensagemCopiada, setMensagemCopiada] = useState(false);
  const [alerta, setAlerta] = useState(null);
  const [paginaAtual, setPaginaAtual] = useState(0);
  const feedbacksPorPagina = 5;
  const totalPaginas = Math.ceil(feedbacks.length / feedbacksPorPagina);

  const feedbacksDaPagina = feedbacks.slice(
    paginaAtual * feedbacksPorPagina,
    (paginaAtual + 1) * feedbacksPorPagina
  );

  const gerarMensagemRelatorio = () => {
    const mensagem = `Olá ${clienteSelecionado}, tudo bem? Gostaríamos de saber como foi sua experiência com o produto ${produtoSelecionado}. Seu feedback é muito importante para nós! 😉💓`;
    setMensagemRelatorio(mensagem);
  };

  const mostrarAlerta = (mensagem, tipo) => {
    setAlerta({ mensagem, tipo });
    setTimeout(() => setAlerta(null), 3000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNovoFeedback((prev) => ({ ...prev, [name]: value }));
  };

  const adicionarFeedback = (e) => {
    e.preventDefault();
    const { cliente, vendedor, produto, mensagem, data } = novoFeedback;
    if (!cliente || !vendedor || !produto || !mensagem || !data) {
      mostrarAlerta('Todos os campos são obrigatórios.', 'danger');
      return;
    }

    setFeedbacks([...feedbacks, novoFeedback]);
    setNovoFeedback({
      cliente: '',
      vendedor: '',
      produto: '',
      mensagem: '',
      data: '',
      prioridade: 'Baixa',
    });
    setModalVisivel(false);
    mostrarAlerta('Feedback registrado com sucesso!', 'success');
    setPaginaAtual(0);
  };

  const copiarParaAreaTransferencia = () => {
    if (!mensagemRelatorio) return;

    navigator.clipboard.writeText(mensagemRelatorio).then(() => {
      setMensagemCopiada(true);
      setTimeout(() => setMensagemCopiada(false), 2000);
    });
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

        <h1 className="m-5 text-center">Registro de Feedback</h1>

        <div className="d-flex justify-content-center align-items-center">
          <button className="btn btn-primary mx-2" onClick={() => setModalVisivel(true)}>
            Novo Feedback
          </button>
          <button className="btn btn-primary mx-2" onClick={() => setModalRelatorioVisivel(true)}>
            Gerar formulário
          </button>
        </div>

        {/* Modal de Novo Feedback */}
        {modalVisivel && (
          <div
            className="modal fade show"
            tabIndex="-1"
            aria-hidden="true"
            style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}
            onClick={() => setModalVisivel(false)}
          >
            <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
              <div className="modal-content bg-light text-dark">
                <div className="modal-header">
                  <h5 className="modal-title">Novo Feedback</h5>
                  <button type="button" className="btn-close" onClick={() => setModalVisivel(false)}></button>
                </div>
                <div className="modal-body">
                  <form onSubmit={adicionarFeedback}>
                    <div className="mb-3">
                      <label className="form-label">Cliente</label>
                      <select className="form-select" name="cliente" value={novoFeedback.cliente} onChange={handleChange}>
                        <option value="">Selecione</option>
                        <option>João</option>
                        <option>Maria</option>
                        <option>Ana</option>
                      </select>
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Vendedor</label>
                      <select className="form-select" name="vendedor" value={novoFeedback.vendedor} onChange={handleChange}>
                        <option value="">Selecione</option>
                        <option>Lucas</option>
                        <option>Fernanda</option>
                      </select>
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Produto</label>
                      <select className="form-select" name="produto" value={novoFeedback.produto} onChange={handleChange}>
                        <option value="">Selecione</option>
                        <option>Produto A</option>
                        <option>Produto B</option>
                      </select>
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Descrição</label>
                      <textarea
                        className="form-control"
                        name="mensagem"
                        placeholder="Descreva o problema ou sugestão com o máximo de clareza possível. Ou cole a mensagem do cliente aqui!"
                        rows="3"
                        value={novoFeedback.mensagem}
                        onChange={(e) => {
                          const texto = e.target.value;
                          const palavrasAlta = ['urgente', 'erro', 'falha', 'problema', 'crítico', 'parou', 'trava', 'não funciona'];
                          const prioridade = palavrasAlta.some(p => texto.toLowerCase().includes(p)) ? 'Alta' : 'Baixa';
                          setNovoFeedback(prev => ({
                            ...prev,
                            mensagem: texto,
                            prioridade
                          }));
                        }}
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Data do Feedback</label>
                      <input
                        type="date"
                        className="form-control"
                        name="data"
                        value={novoFeedback.data}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Prioridade</label>
                      <input
                        type="text"
                        className="form-control"
                        value={novoFeedback.prioridade}
                        readOnly
                      />
                    </div>

                    <button type="submit" className="btn btn-success">Registrar</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal de Relatório */}
        {modalRelatorioVisivel && (
          <div
            className="modal fade show"
            tabIndex="-1"
            aria-hidden="true"
            style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}
            onClick={() => setModalRelatorioVisivel(false)}
          >
            <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
              <div className="modal-content bg-light text-dark">
                <div className="modal-header">
                  <h5 className="modal-title">Gerar Relatório</h5>
                  <button type="button" className="btn-close btn-close-dark" onClick={() => setModalRelatorioVisivel(false)}></button>
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Cliente</label>
                    <select
                      className="form-select bg-light text-dark"
                      value={clienteSelecionado}
                      onChange={(e) => setClienteSelecionado(e.target.value)}
                    >
                      <option value="">Selecione um cliente</option>
                      <option value="João">João</option>
                      <option value="Maria">Maria</option>
                      <option value="Carlos">Carlos</option>
                    </select>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Produto</label>
                    <select
                      className="form-select bg-light text-dark"
                      value={produtoSelecionado}
                      onChange={(e) => setProdutoSelecionado(e.target.value)}
                    >
                      <option value="">Selecione um produto</option>
                      <option value="Produto A">Produto A</option>
                      <option value="Produto B">Produto B</option>
                      <option value="Produto C">Produto C</option>
                    </select>
                  </div>

                  <button className="btn btn-info w-100 mb-3" onClick={gerarMensagemRelatorio}>
                    Gerar Mensagem
                  </button>

                  {mensagemRelatorio && (
                    <div className="mb-3">
                      <label className="form-label">Mensagem Gerada</label>
                      <textarea className="form-control bg-light text-dark" rows="3" value={mensagemRelatorio} readOnly />
                      <button className="btn btn-success mt-2" onClick={copiarParaAreaTransferencia}>
                        Copiar para o WhatsApp
                      </button>
                      {mensagemCopiada && (
                        <small className="text-success d-block mt-1">Mensagem copiada!</small>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="table-responsive">
          <table className="table table-striped mt-5 w-75 m-auto">
            <thead>
              <tr>
                <th>Cliente</th>
                <th>Vendedor</th>
                <th>Produto</th>
                <th>Mensagem</th>
                <th>Prioridade</th>
                <th>Data</th>
              </tr>
            </thead>
            <tbody>
              {feedbacksDaPagina.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center">Nenhum feedback registrado.</td>
                </tr>
              ) : (
                feedbacksDaPagina.map((f, idx) => (
                  <tr key={idx}>
                    <td>{f.cliente}</td>
                    <td>{f.vendedor}</td>
                    <td>{f.produto}</td>
                    <td>{f.mensagem}</td>
                    <td>{f.prioridade}</td>
                    <td>{f.data}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="d-flex justify-content-center mt-3">
          <button
            className="btn btn-outline-secondary me-2"
            onClick={() => setPaginaAtual(paginaAtual - 1)}
            disabled={paginaAtual === 0}
          >
            Anterior
          </button>
          <span>Página {paginaAtual + 1} de {totalPaginas || 1}</span>
          <button
            className="btn btn-outline-secondary ms-2"
            onClick={() => setPaginaAtual(paginaAtual + 1)}
            disabled={paginaAtual >= totalPaginas - 1}
          >
            Próxima
          </button>
        </div>
      </main>
    </div>
  );
};

export default RegistroFeedback;
