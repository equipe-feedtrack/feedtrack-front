import React, { useState } from 'react';
import NavBar from '../components/NavBar';

const RegistroFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [novoFeedback, setNovoFeedback] = useState({ nome: '', mensagem: '', data: '' });
  const [modalVisivel, setModalVisivel] = useState(false);
  const [alerta, setAlerta] = useState(null);
  const [paginaAtual, setPaginaAtual] = useState(0);
  const feedbacksPorPagina = 5;
  const totalPaginas = Math.ceil(feedbacks.length / feedbacksPorPagina);

  const feedbacksDaPagina = feedbacks.slice(
    paginaAtual * feedbacksPorPagina,
    (paginaAtual + 1) * feedbacksPorPagina
  );

  const mostrarAlerta = (mensagem, tipo) => {
    setAlerta({ mensagem, tipo });
    setTimeout(() => setAlerta(null), 3000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNovoFeedback({ ...novoFeedback, [name]: value });
  };

  const adicionarFeedback = (e) => {
    e.preventDefault();
    if (!novoFeedback.nome || !novoFeedback.mensagem || !novoFeedback.data) {
      mostrarAlerta('Todos os campos são obrigatórios.', 'danger');
      return;
    }

    setFeedbacks([...feedbacks, novoFeedback]);
    setNovoFeedback({ nome: '', mensagem: '', data: '' });
    setModalVisivel(false);
    mostrarAlerta('Feedback registrado com sucesso!', 'success');
    setPaginaAtual(0);
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

        <button className="btn btn-primary d-block m-auto" onClick={() => setModalVisivel(true)}>
          Novo Feedback
        </button>

       
        {modalVisivel && (
          <div
            className="modal fade show"
            tabIndex="-1"
            aria-hidden="true"
            style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}
          >
            <div className="modal-dialog">
              <div className="modal-content bg-dark text-light">
                <div className="modal-header">
                  <h5 className="modal-title">Novo Feedback</h5>
                  <button type="button" className="btn-close btn-close-white" onClick={() => setModalVisivel(false)}></button>
                </div>
                <div className="modal-body">
                  <form onSubmit={adicionarFeedback}>
                    <div className="mb-3">
                      <label className="form-label">Nome</label>
                      <input
                        type="text"
                        className="form-control bg-secondary text-light"
                        name="nome"
                        value={novoFeedback.nome}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">feedback</label>
                      <textarea
                        className="form-control bg-secondary text-light"
                        name="mensagem"
                        rows="3"
                        value={novoFeedback.mensagem}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Data do feedback</label>
                      <input
                        type="date"
                        className="form-control bg-secondary text-light"
                        name="data"
                        value={novoFeedback.data}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <button type="submit" className="btn btn-success">Registrar</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="table-responsive">
          <table className="table table-striped mt-5 w-75 m-auto">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Mensagem</th>
                <th>Data</th>
              </tr>
            </thead>
            <tbody>
              {feedbacksDaPagina.length === 0 ? (
                <tr>
                  <td colSpan="3" className="text-center">Nenhum feedback registrado.</td>
                </tr>
              ) : (
                feedbacksDaPagina.map((f, idx) => (
                  <tr key={idx}>
                    <td>{f.nome}</td>
                    <td>{f.mensagem}</td>
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
