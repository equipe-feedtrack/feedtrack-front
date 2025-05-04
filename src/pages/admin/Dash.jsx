import React, { useState, useEffect } from 'react';
import NavBar from '../../components/NavBarTwo';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

function Dash() {
  const [empresas, setEmpresas] = useState([]);
  const [detalhesEmpresaId, setDetalhesEmpresaId] = useState(null);
  const [totalEmpresas, setTotalEmpresas] = useState(0);
  const [novasEmpresasUltimos7Dias, setNovasEmpresasUltimos7Dias] = useState(0);
  const [statusCounts, setStatusCounts] = useState({});

  useEffect(() => {
    // Simulação de dados das empresas (em um projeto real, buscaríamos de uma API)
    const hoje = new Date();
    const seteDiasAtras = new Date(hoje);
    seteDiasAtras.setDate(hoje.getDate() - 7);

    const dadosEmpresas = [
      { id: 1, nome: 'Empresa A', email: 'contato@empresaA.com.br', dataCadastro: '2024-01-15', status: 'Ativa', plano: 'Premium', ultimoPagamento: '2025-05-01', proximoPagamento: '2025-06-01', armazenamentoUsado: '5GB', armazenamentoTotal: '10GB', permissoes: ['admin', 'suporte'] },
      { id: 2, nome: 'Empresa B', email: 'suporte@empresaB.com.br', dataCadastro: '2024-03-20', status: 'Inativa', plano: 'Básico', ultimoPagamento: '2025-04-15', proximoPagamento: '2025-05-15', armazenamentoUsado: '2GB', armazenamentoTotal: '5GB', permissoes: ['suporte'] },
      { id: 3, nome: 'Empresa C', email: 'vendas@empresaC.com.br', dataCadastro: '2024-05-01', status: 'Ativa', plano: 'Intermediário', ultimoPagamento: '2025-05-10', proximoPagamento: '2025-06-10', armazenamentoUsado: '8GB', armazenamentoTotal: '20GB', permissoes: ['admin', 'vendas'] },
      { id: 4, nome: 'Empresa D', email: 'financeiro@empresaD.com.br', dataCadastro: '2024-07-10', status: 'Pendente', plano: null, ultimoPagamento: null, proximoPagamento: null, armazenamentoUsado: '1GB', armazenamentoTotal: '5GB', permissoes: [] },
      { id: 5, nome: 'Empresa E', email: 'rh@empresaE.com.br', dataCadastro: '2025-05-01', status: 'Ativa', plano: 'Premium', ultimoPagamento: '2025-05-05', proximoPagamento: '2025-06-05', armazenamentoUsado: '7GB', armazenamentoTotal: '10GB', permissoes: ['admin', 'rh'] },
      { id: 6, nome: 'Empresa F', email: 'marketing@empresaF.com.br', dataCadastro: '2025-04-28', status: 'Ativa', plano: 'Básico', ultimoPagamento: '2025-04-25', proximoPagamento: '2025-05-25', armazenamentoUsado: '3GB', armazenamentoTotal: '5GB', permissoes: ['marketing'] },
    ];

    setEmpresas(dadosEmpresas);
    setTotalEmpresas(dadosEmpresas.length);

    const novasSeteDias = dadosEmpresas.filter(empresa => new Date(empresa.dataCadastro) >= seteDiasAtras);
    setNovasEmpresasUltimos7Dias(novasSeteDias.length);

    const counts = dadosEmpresas.reduce((acc, empresa) => {
      acc[empresa.status] = (acc[empresa.status] || 0) + 1;
      return acc;
    }, {});
    setStatusCounts(counts);
  }, []);

  const mostrarDetalhes = (id) => {
    setDetalhesEmpresaId(id);
  };

  const fecharDetalhes = () => {
    setDetalhesEmpresaId(null);
  };

  const empresaSelecionada = empresas.find(empresa => empresa.id === detalhesEmpresaId);

  const pieChartData = {
    labels: Object.keys(statusCounts),
    datasets: [
      {
        label: 'Status das Empresas',
        data: Object.values(statusCounts),
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const pieChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: true,
        text: 'Distribuição de Status das Empresas',
      },
    },
  };

  return (
    <div>
      <NavBar />
      <div className="container mt-5">
        <h2>Painel de Administração de Empresas</h2>

        <div className="row mb-4">
          <div className="col-md-4">
            <div className="card bg-light p-3 rounded shadow-sm">
              <h5 className="card-title">Total de Empresas</h5>
              <p className="card-text display-4">{totalEmpresas}</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card bg-light p-3 rounded shadow-sm">
              <h5 className="card-title">Novas Empresas (Últimos 7 dias)</h5>
              <p className="card-text display-4">{novasEmpresasUltimos7Dias}</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card bg-light p-3 rounded shadow-sm">
              <h5 className="card-title">Status das Empresas</h5>
              <Pie data={pieChartData} options={pieChartOptions} />
            </div>
          </div>
        </div>

        <h3>Listagem de Empresas</h3>
        <table className="table table-striped shadow-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Plano</th>
              <th>Último Pagamento</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {empresas.map(empresa => (
              <tr key={empresa.id}>
                <td>{empresa.id}</td>
                <td>{empresa.nome}</td>
                <td>{empresa.plano || 'Nenhum'}</td>
                <td>{empresa.ultimoPagamento || 'Nenhum'}</td>
                <td>{empresa.status}</td>
                <td>
                  <button className="btn btn-info btn-sm me-2" onClick={() => mostrarDetalhes(empresa.id)}>
                    Detalhes
                  </button>
                  <button className="btn btn-warning btn-sm me-2">Editar</button>
                  {/* Adicione outros botões de ação, como Excluir */}
                  <button className="btn btn-danger btn-sm">Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {empresaSelecionada && (
          <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-lg"> {/* Aumentando o tamanho do modal para mais informações */}
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Detalhes da Empresa</h5>
                  <button type="button" className="btn-close" onClick={fecharDetalhes}></button>
                </div>
                <div className="modal-body">
                  <div className="row">
                    <div className="col-md-6">
                      <p><strong>ID:</strong> {empresaSelecionada.id}</p>
                      <p><strong>Nome:</strong> {empresaSelecionada.nome}</p>
                      <p><strong>Email:</strong> {empresaSelecionada.email}</p>
                      <p><strong>Data de Cadastro:</strong> {empresaSelecionada.dataCadastro}</p>
                      <p><strong>Status:</strong> {empresaSelecionada.status}</p>
                      <p><strong>Plano:</strong> {empresaSelecionada.plano || 'Nenhum'}</p>
                      <p><strong>Último Pagamento:</strong> {empresaSelecionada.ultimoPagamento || 'Nenhum'}</p>
                      <p><strong>Próximo Pagamento:</strong> {empresaSelecionada.proximoPagamento || 'Nenhum'}</p>
                    </div>
                    <div className="col-md-6">
                      <p><strong>Armazenamento Usado:</strong> {empresaSelecionada.armazenamentoUsado}</p>
                      <p><strong>Armazenamento Total:</strong> {empresaSelecionada.armazenamentoTotal}</p>
                      <div>
                        <strong>Permissões:</strong>
                        {empresaSelecionada.permissoes && empresaSelecionada.permissoes.length > 0 ? (
                          <ul>
                            {empresaSelecionada.permissoes.map((permissao, index) => (
                              <li key={index}>{permissao}</li>
                            ))}
                          </ul>
                        ) : (
                          <p>Nenhuma permissão atribuída.</p>
                        )}
                      </div>
                      {/* Aqui você pode adicionar mais detalhes e talvez controles para editar essas informações */}
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={fecharDetalhes}>Fechar</button>
                  <button type="button" className="btn btn-primary">Editar Dados</button> {/* Exemplo de botão de ação */}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dash;