import React, { useState, useEffect, useMemo } from 'react';
import NavBar from '../../components/NavBarTwo'; // Certifique-se de que NavBarTwo é o componente correto para sua navegação
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
// Importações de ícones se estiver usando, por exemplo, Font Awesome ou Bootstrap Icons
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faSearch, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';

ChartJS.register(ArcElement, Tooltip, Legend);

// Dados simulados (pode ser movido para um arquivo separado em projetos maiores)
const DADOS_EMPRESAS_SIMULADOS = [
  { id: 1, nome: 'Empresa A S.A.', email: 'contato@empresaA.com.br', dataCadastro: '2024-01-15', status: 'Ativa', plano: 'Premium', ultimoPagamento: '2025-05-01', proximoPagamento: '2025-06-01', armazenamentoUsado: '5GB', armazenamentoTotal: '10GB', permissoes: ['admin', 'suporte'] },
  { id: 2, nome: 'Empresa B Ltda.', email: 'suporte@empresaB.com.br', dataCadastro: '2024-03-20', status: 'Inativa', plano: 'Básico', ultimoPagamento: '2025-04-15', proximoPagamento: '2025-05-15', armazenamentoUsado: '2GB', armazenamentoTotal: '5GB', permissoes: ['suporte'] },
  { id: 3, nome: 'Empresa C Corp.', email: 'vendas@empresaC.com.br', dataCadastro: '2024-05-01', status: 'Ativa', plano: 'Intermediário', ultimoPagamento: '2025-05-10', proximoPagamento: '2025-06-10', armazenamentoUsado: '8GB', armazenamentoTotal: '20GB', permissoes: ['admin', 'vendas'] },
  { id: 4, nome: 'Empresa D Group', email: 'financeiro@empresaD.com.br', dataCadastro: '2024-07-10', status: 'Pendente', plano: null, ultimoPagamento: null, proximoPagamento: null, armazenamentoUsado: '1GB', armazenamentoTotal: '5GB', permissoes: [] },
  { id: 5, nome: 'Empresa E Global', email: 'rh@empresaE.com.br', dataCadastro: '2025-05-01', status: 'Ativa', plano: 'Premium', ultimoPagamento: '2025-05-05', proximoPagamento: '2025-06-05', armazenamentoUsado: '7GB', armazenamentoTotal: '10GB', permissoes: ['admin', 'rh'] },
  { id: 6, nome: 'Empresa F Solutions', email: 'marketing@empresaF.com.br', dataCadastro: '2025-04-28', status: 'Ativa', plano: 'Básico', ultimoPagamento: '2025-04-25', proximoPagamento: '2025-05-25', armazenamentoUsado: '3GB', armazenamentoTotal: '5GB', permissoes: ['marketing'] },
  { id: 7, nome: 'Empresa G Tech', email: 'info@empresaG.com.br', dataCadastro: '2025-05-15', status: 'Ativa', plano: 'Premium', ultimoPagamento: '2025-05-10', proximoPagamento: '2025-06-10', armazenamentoUsado: '6GB', armazenamentoTotal: '10GB', permissoes: ['admin'] },
  { id: 8, nome: 'Empresa H Services', email: 'help@empresaH.com.br', dataCadastro: '2025-05-20', status: 'Teste', plano: 'Básico', ultimoPagamento: null, proximoPagamento: '2025-06-20', armazenamentoUsado: '1GB', armazenamentoTotal: '5GB', permissoes: ['suporte'] },
  { id: 9, nome: 'Empresa I Innovations', email: 'dev@empresaI.com.br', dataCadastro: '2025-05-25', status: 'Ativa', plano: 'Intermediário', ultimoPagamento: '2025-05-20', proximoPagamento: '2025-06-20', armazenamentoUsado: '4GB', armazenamentoTotal: '20GB', permissoes: ['admin'] },
  { id: 10, nome: 'Empresa J Ventures', email: 'parceria@empresaJ.com.br', dataCadastro: '2025-05-30', status: 'Ativa', plano: 'Premium', ultimoPagamento: '2025-05-28', proximoPagamento: '2025-06-28', armazenamentoUsado: '9GB', armazenamentoTotal: '10GB', permissoes: ['vendas'] },
  { id: 11, nome: 'Empresa K Labs', email: 'contact@empresaK.com.br', dataCadastro: '2025-06-01', status: 'Ativa', plano: 'Básico', ultimoPagamento: '2025-05-30', proximoPagamento: '2025-06-30', armazenamentoUsado: '2.5GB', armazenamentoTotal: '5GB', permissoes: ['suporte'] },
  { id: 12, nome: 'Empresa L Solutions', email: 'hello@empresaL.com.br', dataCadastro: '2025-06-03', status: 'Pendente', plano: null, ultimoPagamento: null, proximoPagamento: null, armazenamentoUsado: '0.5GB', armazenamentoTotal: '5GB', permissoes: [] },
  { id: 13, nome: 'Empresa M Dynamics', email: 'support@empresaM.com.br', dataCadastro: '2025-06-05', status: 'Ativa', plano: 'Premium', ultimoPagamento: '2025-06-01', proximoPagamento: '2025-07-01', armazenamentoUsado: '6GB', armazenamentoTotal: '10GB', permissoes: ['admin'] },
  { id: 14, nome: 'Empresa N Connect', email: 'sales@empresaN.com.br', dataCadastro: '2025-06-07', status: 'Teste', plano: 'Básico', ultimoPagamento: null, proximoPagamento: '2025-07-07', armazenamentoUsado: '1.5GB', armazenamentoTotal: '5GB', permissoes: ['vendas'] },
];


function Dash() {
  const [empresas, setEmpresas] = useState([]);
  const [detalhesEmpresaId, setDetalhesEmpresaId] = useState(null);
  const [totalEmpresas, setTotalEmpresas] = useState(0);
  const [novasEmpresasUltimos7Dias, setNovasEmpresasUltimos7Dias] = useState(0);
  const [statusCounts, setStatusCounts] = useState({});

  // Estados para Filtragem e Paginação
  const [filtroNome, setFiltroNome] = useState('');
  const [filtroStatus, setFiltroStatus] = useState('Todos');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Define quantos itens por página
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

  useEffect(() => {
    // Simulação de busca de dados
    const fetchData = async () => {
      // Em um projeto real:
      // const response = await fetch('/api/empresas');
      // const data = await response.json();
      // setEmpresas(data);

      // Usando dados simulados:
      setEmpresas(DADOS_EMPRESAS_SIMULADOS);
      setTotalEmpresas(DADOS_EMPRESAS_SIMULADOS.length);

      const hoje = new Date();
      const seteDiasAtras = new Date(hoje);
      seteDiasAtras.setDate(hoje.getDate() - 7);
      seteDiasAtras.setHours(0, 0, 0, 0); // Zera hora para comparação de datas

      const novasSeteDias = DADOS_EMPRESAS_SIMULADOS.filter(empresa => {
        const dataCadastro = new Date(empresa.dataCadastro);
        return dataCadastro >= seteDiasAtras && dataCadastro <= hoje;
      });
      setNovasEmpresasUltimos7Dias(novasSeteDias.length);

      const counts = DADOS_EMPRESAS_SIMULADOS.reduce((acc, empresa) => {
        acc[empresa.status] = (acc[empresa.status] || 0) + 1;
        return acc;
      }, {});
      setStatusCounts(counts);
    };

    fetchData();
  }, []); // O array de dependências vazio significa que este useEffect roda uma vez após a montagem

  // Lógica de Filtragem, Ordenação e Paginação
  const sortedAndFilteredEmpresas = useMemo(() => {
    let filtered = empresas;

    // 1. Filtragem por Nome
    if (filtroNome) {
      filtered = filtered.filter(empresa =>
        empresa.nome.toLowerCase().includes(filtroNome.toLowerCase())
      );
    }

    // 2. Filtragem por Status
    if (filtroStatus !== 'Todos') {
      filtered = filtered.filter(empresa => empresa.status === filtroStatus);
    }

    // 3. Ordenação
    if (sortConfig.key) {
      filtered.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];

        if (aValue < bValue) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }

    return filtered;
  }, [empresas, filtroNome, filtroStatus, sortConfig]);

  // Paginação
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentEmpresas = sortedAndFilteredEmpresas.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedAndFilteredEmpresas.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Ordenação
  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const getSortIndicator = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === 'ascending' ? ' ▲' : ' ▼'; // Use ícones reais se tiver uma biblioteca
    }
    return '';
  };

  const mostrarDetalhes = (id) => {
    setDetalhesEmpresaId(id);
  };

  const fecharDetalhes = () => {
    setDetalhesEmpresaId(null);
  };

  const empresaSelecionada = useMemo(() => {
    return empresas.find(empresa => empresa.id === detalhesEmpresaId);
  }, [empresas, detalhesEmpresaId]);


  const pieChartData = {
    labels: Object.keys(statusCounts),
    datasets: [
      {
        label: 'Status das Empresas',
        data: Object.values(statusCounts),
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)', // Ativa (exemplo: vermelho)
          'rgba(54, 162, 235, 0.6)', // Inativa (exemplo: azul)
          'rgba(255, 206, 86, 0.6)', // Pendente (exemplo: amarelo)
          'rgba(75, 192, 192, 0.6)', // Teste (exemplo: verde água)
          'rgba(153, 102, 255, 0.6)', // Outros (exemplo: roxo)
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
    maintainAspectRatio: false, // Permite maior controle sobre o tamanho
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
            usePointStyle: true, // Estilo de ponto para as legendas
        }
      },
      title: {
        display: true,
        text: 'Distribuição de Status das Empresas',
        font: {
            size: 16,
            weight: 'bold'
        },
        padding: {
            top: 10,
            bottom: 30
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            let label = context.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed !== null) {
              label += context.parsed + ' (' + ((context.parsed / Object.values(statusCounts).reduce((a, b) => a + b, 0)) * 100).toFixed(2) + '%)';
            }
            return label;
          }
        }
      }
    },
  };

  // Função auxiliar para formatar datas (se necessário)
  const formatarData = (dataString) => {
    if (!dataString) return 'N/A';
    const data = new Date(dataString);
    return data.toLocaleDateString('pt-BR');
  };

  return (
    <div>
      <NavBar />
      <div className="container mt-5">
        <h2 className="mb-4">Painel de Administração de Empresas</h2>

        {/* Seção de Cards de Resumo - Melhorar Responsividade */}
        <div className="row mb-4 gy-4"> {/* Adicionado gy-4 para espaçamento vertical em telas menores */}
          <div className="col-md-6 col-lg-4"> {/* col-md-6 para 2 colunas em tablets, col-lg-4 para 3 colunas em desktops */}
            <div className="card bg-primary text-white p-3 rounded shadow-sm h-100 d-flex flex-column justify-content-between">
              <h5 className="card-title mb-3">Total de Empresas</h5>
              <p className="card-text display-4 text-center flex-grow-1 d-flex align-items-center justify-content-center">{totalEmpresas}</p>
              {/* Adicione um ícone ou indicador aqui */}
              {/* <FontAwesomeIcon icon={faBuilding} size="2x" className="ms-auto" /> */}
            </div>
          </div>
          <div className="col-md-6 col-lg-4">
            <div className="card bg-success text-white p-3 rounded shadow-sm h-100 d-flex flex-column justify-content-between">
              <h5 className="card-title mb-3">Novas Empresas (Últimos 7 dias)</h5>
              <p className="card-text display-4 text-center flex-grow-1 d-flex align-items-center justify-content-center">{novasEmpresasUltimos7Dias}</p>
            </div>
          </div>
          <div className="col-lg-4"> {/* Em telas menores, este card pode ser empilhado ou ter outro layout */}
            <div className="card bg-light p-3 rounded shadow-sm h-100">
              <h5 className="card-title text-center">Status das Empresas</h5>
              <div style={{ height: '250px', width: '100%' }}> {/* Define uma altura fixa para o gráfico */}
                <Pie data={pieChartData} options={pieChartOptions} />
              </div>
            </div>
          </div>
        </div>

        {/* Seção de Filtragem */}
        <div className="row mb-4">
            <div className="col-12">
                <div className="card p-3 shadow-sm">
                    <h5 className="card-title mb-3">Filtros da Tabela</h5>
                    <div className="row g-3">
                        <div className="col-md-6">
                            <label htmlFor="filtroNome" className="form-label visually-hidden">Buscar por Nome</label>
                            <div className="input-group">
                                <span className="input-group-text">🔍</span> {/* Ícone de busca */}
                                <input
                                    type="text"
                                    className="form-control"
                                    id="filtroNome"
                                    placeholder="Buscar por nome da empresa..."
                                    value={filtroNome}
                                    onChange={(e) => {
                                        setFiltroNome(e.target.value);
                                        setCurrentPage(1); // Resetar para a primeira página ao filtrar
                                    }}
                                />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="filtroStatus" className="form-label visually-hidden">Filtrar por Status</label>
                            <select
                                className="form-select"
                                id="filtroStatus"
                                value={filtroStatus}
                                onChange={(e) => {
                                    setFiltroStatus(e.target.value);
                                    setCurrentPage(1); // Resetar para a primeira página ao filtrar
                                }}
                            >
                                <option value="Todos">Todos os Status</option>
                                {Object.keys(statusCounts).map(status => (
                                    <option key={status} value={status}>{status}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>


        <h3>Listagem de Empresas</h3>
        <div className="table-responsive"> {/* Torna a tabela responsiva em telas pequenas */}
            <table className="table table-striped table-hover shadow-sm caption-top"> {/* Adicionado table-hover */}
                <caption>Lista completa de empresas cadastradas</caption>
                <thead>
                    <tr>
                        <th scope="col" onClick={() => requestSort('id')} style={{ cursor: 'pointer' }}>
                            ID {getSortIndicator('id')}
                        </th>
                        <th scope="col" onClick={() => requestSort('nome')} style={{ cursor: 'pointer' }}>
                            Nome {getSortIndicator('nome')}
                        </th>
                        <th scope="col" onClick={() => requestSort('plano')} style={{ cursor: 'pointer' }}>
                            Plano {getSortIndicator('plano')}
                        </th>
                        <th scope="col" onClick={() => requestSort('ultimoPagamento')} style={{ cursor: 'pointer' }}>
                            Último Pagamento {getSortIndicator('ultimoPagamento')}
                        </th>
                        <th scope="col" onClick={() => requestSort('status')} style={{ cursor: 'pointer' }}>
                            Status {getSortIndicator('status')}
                        </th>
                        <th scope="col">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {currentEmpresas.length > 0 ? (
                        currentEmpresas.map(empresa => (
                            <tr key={empresa.id}>
                                <td>{empresa.id}</td>
                                <td>{empresa.nome}</td>
                                <td><span className={`badge ${empresa.plano ? 'bg-primary' : 'bg-secondary'}`}>{empresa.plano || 'Nenhum'}</span></td> {/* Indicador visual para plano */}
                                <td>{formatarData(empresa.ultimoPagamento)}</td>
                                <td><span className={`badge ${empresa.status === 'Ativa' ? 'bg-success' : empresa.status === 'Inativa' ? 'bg-danger' : empresa.status === 'Pendente' ? 'bg-warning text-dark' : 'bg-info text-dark'}`}>{empresa.status}</span></td> {/* Indicador visual para status */}
                                <td>
                                    <div className="d-flex flex-wrap gap-2"> {/* Botões responsivos */}
                                        <button className="btn btn-info btn-sm" onClick={() => mostrarDetalhes(empresa.id)}>
                                            Detalhes
                                        </button>
                                        <button className="btn btn-warning btn-sm">Editar</button>
                                        <button className="btn btn-danger btn-sm">Excluir</button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="text-center p-4">Nenhuma empresa encontrada com os filtros aplicados.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>

        {/* Paginação */}
        {totalPages > 1 && (
            <nav aria-label="Paginação de empresas" className="bg-transparent p-3 rounded">
                <ul className="pagination justify-content-center flex-wrap"> {/* flex-wrap para responsividade */}
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                        <button className="page-link" onClick={() => paginate(currentPage - 1)}>Anterior</button>
                    </li>
                    {[...Array(totalPages).keys()].map(number => (
                        <li key={number + 1} className={`page-item ${currentPage === number + 1 ? 'active' : ''}`}>
                            <button onClick={() => paginate(number + 1)} className="page-link">
                                {number + 1}
                            </button>
                        </li>
                    ))}
                    <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                        <button className="page-link" onClick={() => paginate(currentPage + 1)}>Próxima</button>
                    </li>
                </ul>
            </nav>
        )}

        {/* Modal de Detalhes da Empresa (Melhorado) */}
        {empresaSelecionada && (
          <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }} tabIndex="-1" role="dialog" aria-labelledby="empresaDetalhesModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg modal-dialog-scrollable"> {/* modal-dialog-scrollable para conteúdo longo */}
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="empresaDetalhesModalLabel">Detalhes da Empresa: {empresaSelecionada.nome}</h5>
                  <button type="button" className="btn-close" onClick={fecharDetalhes} aria-label="Close"></button>
                </div>
                <div className="modal-body">
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <p><strong>ID:</strong> {empresaSelecionada.id}</p>
                      <p><strong>Email:</strong> {empresaSelecionada.email}</p>
                      <p><strong>Status:</strong> <span className={`badge ${empresaSelecionada.status === 'Ativa' ? 'bg-success' : empresaSelecionada.status === 'Inativa' ? 'bg-danger' : empresaSelecionada.status === 'Pendente' ? 'bg-warning text-dark' : 'bg-info text-dark'}`}>{empresaSelecionada.status}</span></p>
                      <p><strong>Plano:</strong> <span className={`badge ${empresaSelecionada.plano ? 'bg-primary' : 'bg-secondary'}`}>{empresaSelecionada.plano || 'Nenhum'}</span></p>
                      <p><strong>Data de Cadastro:</strong> {formatarData(empresaSelecionada.dataCadastro)}</p>
                    </div>
                    <div className="col-md-6">
                      <p><strong>Último Pagamento:</strong> {formatarData(empresaSelecionada.ultimoPagamento)}</p>
                      <p><strong>Próximo Pagamento:</strong> {formatarData(empresaSelecionada.proximoPagamento)}</p>
                      <p><strong>Armazenamento Usado:</strong> {empresaSelecionada.armazenamentoUsado}</p>
                      <p><strong>Armazenamento Total:</strong> {empresaSelecionada.armazenamentoTotal}</p>
                    </div>
                  </div>
                  <div>
                    <h6 className="mb-2">Permissões:</h6>
                    {empresaSelecionada.permissoes && empresaSelecionada.permissoes.length > 0 ? (
                      <ul className="list-group list-group-flush">
                        {empresaSelecionada.permissoes.map((permissao, index) => (
                          <li key={index} className="list-group-item">{permissao}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-muted">Nenhuma permissão atribuída.</p>
                    )}
                  </div>
                  {/* Seções Adicionais no Modal */}
                  <hr className="my-3" />
                  <h6 className="mb-2">Histórico de Atividades (Exemplo)</h6>
                  <p>Último login: {formatarData('2025-06-05 10:30:00')}</p>
                  <p>Última atualização de perfil: {formatarData('2025-06-01 14:00:00')}</p>
                  <p className="text-muted">Detalhes adicionais e logs podem ser carregados aqui...</p>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={fecharDetalhes}>Fechar</button>
                  <button type="button" className="btn btn-primary">Editar Empresa</button>
                  <button type="button" className="btn btn-outline-danger">Desativar Empresa</button>
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