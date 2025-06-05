import React, { useEffect, useState } from 'react'
import NavBar from '../components/NavBar'
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend)

function DesempenhoFuncionarios() {
    const [funcionarioSelecionado, setFuncionarioSelecionado] = useState(null)
    const [alerta, setAlerta] = useState(null)
    // Novo estado para o filtro de setor
    const [setorSelecionado, setSetorSelecionado] = useState('Todos') // 'Todos' como valor inicial

    const [todosFuncionarios] = useState([
      { nome: 'Ana Souza', departamento: 'RH', nota: 2.7, ultima: '2025-05-10', observacao: 'Excelente liderança e comunicação.' },
      { nome: 'Carlos Lima', departamento: 'TI', nota: 2.3, ultima: '2025-05-08', observacao: 'Bom desempenho em projetos técnicos.' },
      { nome: 'Maria Silva', departamento: 'Marketing', nota: 1.8, ultima: '2025-05-02', observacao: 'Precisa melhorar a entrega de prazos.' },
      { nome: 'Pedro Santos', departamento: 'Financeiro', nota: 2.8, ultima: '2025-04-29', observacao: 'Desempenho abaixo do esperado.' },
      { nome: 'João Oliveira', departamento: 'RH', nota: 3.5, ultima: '2025-05-15', observacao: 'Proativo e colaborativo.' },
      { nome: 'Fernanda Costa', departamento: 'TI', nota: 4.1, ultima: '2025-05-12', observacao: 'Habilidades técnicas avançadas.' },
      { nome: 'Rafael Almeida', departamento: 'Marketing', nota: 2.5, ultima: '2025-05-05', observacao: 'Criativo, mas com dificuldades em organização.' },
      { nome: 'Carolina Mendes', departamento: 'Financeiro', nota: 4.9, ultima: '2025-05-01', observacao: 'Desempenho excepcional em análise de dados.' },
      { nome: 'Lucas Pereira', departamento: 'TI', nota: 1.5, ultima: '2025-04-20', observacao: 'Necessita de acompanhamento próximo.' },
    ])
    
    // O estado `funcionarios` agora será filtrado com base na pesquisa e no setor
    const [funcionarios, setFuncionarios] = useState(todosFuncionarios) 
    
    // Novo estado para a string de pesquisa
    const [termoPesquisa, setTermoPesquisa] = useState('')

    // UseEffect para atualizar a lista de alertas e a lista de funcionários filtrada
    useEffect(() => {
        const totalAlertas = funcionarios.filter(f => f.nota < 3).length
        setAlerta(totalAlertas)

        // Lógica de filtro combinada
        let funcionariosFiltrados = todosFuncionarios

        if (termoPesquisa.trim() !== '') {
            funcionariosFiltrados = funcionariosFiltrados.filter(f =>
                f.nome.toLowerCase().includes(termoPesquisa.toLowerCase())
            )
        }

        if (setorSelecionado !== 'Todos') {
            funcionariosFiltrados = funcionariosFiltrados.filter(f =>
                f.departamento === setorSelecionado
            )
        }
        setFuncionarios(funcionariosFiltrados)

    }, [todosFuncionarios, termoPesquisa, setorSelecionado]) // Dependências atualizadas

    const mediaGeral = funcionarios.reduce((total, funcionario) => total + funcionario.nota, 0) / funcionarios.length

    // Mapeia os departamentos únicos para o dropdown
    const departamentosUnicos = ['Todos', ...new Set(todosFuncionarios.map(f => f.departamento))].sort()

    // Lógica para calcular a média por departamento dinamicamente para o gráfico
    const calcularMediaPorDepartamento = () => {
        const medias = {};
        todosFuncionarios.forEach(f => {
            if (!medias[f.departamento]) {
                medias[f.departamento] = { total: 0, count: 0 };
            }
            medias[f.departamento].total += f.nota;
            medias[f.departamento].count++;
        });

        const labelsGrafico = Object.keys(medias).sort();
        const dataGrafico = labelsGrafico.map(dep => 
            (medias[dep].total / medias[dep].count).toFixed(2)
        );

        return { labels: labelsGrafico, data: dataGrafico };
    };

    const { labels: labelsGrafico, data: dataGrafico } = calcularMediaPorDepartamento();


    const dadosGrafico = {
        labels: labelsGrafico,
        datasets: [
            {
                label: 'Média por Departamento',
                data: dataGrafico,
                backgroundColor: '#0d6efd',
                borderRadius: 8,
            },
        ],
    }

    const opcoesGrafico = {
        responsive: true,
        plugins: {
            legend: { position: 'top' },
        },
        scales: {
            y: {
                beginAtZero: true,
                max: 5,
            },
        },
    }

    const abrirModal = (funcionario) => {
        setFuncionarioSelecionado(funcionario)
        const modal = new window.bootstrap.Modal(document.getElementById('detalheModal'))
        modal.show()
    }

    return (
        <div className="bg-light min-vh-100">
            <NavBar />
            <div className="container py-5">
                <h1 className="mb-4">Desempenho dos Funcionários</h1>

                {/* KPIs */}
                <div className="row mb-4">
                    <div className="col-md-3 mb-3">
                        <div className="card text-center shadow">
                            <div className="card-body">
                                <p className="card-title text-muted">Avaliados</p>
                                <h4 className="card-text text-primary">{funcionarios.length}</h4>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 mb-3">
                        <div className="card text-center shadow">
                            <div className="card-body">
                                <p className="card-title text-muted">Média Geral</p>
                                <h4 className="card-text text-warning">{mediaGeral.toFixed(2)} ★</h4>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 mb-3">
                        <div className="card text-center shadow">
                            <div className="card-body">
                                <p className="card-title text-muted">Destaque</p>
                                {/* Lógica para encontrar o funcionário de destaque dinamicamente */}
                                <h5 className="card-text">
                                    {funcionarios.length > 0 ? 
                                        funcionarios.reduce((prev, current) => (prev.nota > current.nota ? prev : current)).nome : 
                                        'N/A'}
                                </h5>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 mb-3">
                        <div className="card text-center shadow">
                            <div className="card-body">
                                <p className="card-title text-muted">Alertas</p>
                                <h5 className="card-text text-danger">
                                    {alerta}{' '}
                                    <abbr title="Funcionários com desempenho abaixo de 3">
                                        Alerta{alerta !== 1 ? 's' : ''}
                                    </abbr>
                                </h5>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Gráfico */}
                <div className="card mb-5 shadow">
                    <div className="card-body">
                        <h5 className="card-title mb-4">Desempenho Médio por Departamento</h5>
                        <Bar data={dadosGrafico} options={opcoesGrafico} />
                    </div>
                </div>

                {/* Filtros de Pesquisa e Setor */}
                <div className="card mb-4 shadow container p-2">
                    <div className="row">
                        <div className="col-md-6 mb-3 mb-md-0">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Pesquisar Funcionário"
                                value={termoPesquisa}
                                onChange={(e) => setTermoPesquisa(e.target.value)}
                            />
                        </div>
                        <div className="col-md-6">
                            <select
                                className="form-select"
                                value={setorSelecionado}
                                onChange={(e) => setSetorSelecionado(e.target.value)}
                            >
                                {departamentosUnicos.map((dep, index) => (
                                    <option key={index} value={dep}>{dep}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Cards dos Funcionários */}
                <div className="row">
                    {funcionarios.length > 0 ? (
                        funcionarios.map((f, i) => (
                            <div className="col-md-4 mb-4" key={i}>
                                <div className="card h-100 shadow-sm">
                                    <div className="card-body d-flex flex-column">
                                        <h5 className="card-title">{f.nome}</h5>
                                        <p className="card-subtitle mb-2 text-muted">{f.departamento}</p>
                                        <p className="mb-1">Nota: <strong>{f.nota}</strong></p>
                                        <p className="text-muted">Última Avaliação: {f.ultima}</p>
                                        <button
                                            className="btn btn-primary mt-auto"
                                            onClick={() => abrirModal(f)}
                                        >
                                            Ver Detalhes
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-12">
                            <div className="alert alert-info text-center" role="alert">
                                Nenhum funcionário encontrado com os filtros aplicados.
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Modal de Detalhes */}
            <div className="modal fade" id="detalheModal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        {funcionarioSelecionado && (
                            <>
                                <div className="modal-header">
                                    <h5 className="modal-title">{funcionarioSelecionado.nome}</h5>
                                    <button
                                        type="button"
                                        className="btn-close"
                                        data-bs-dismiss="modal"
                                        aria-label="Close"
                                    ></button>
                                </div>
                                <div className="modal-body">
                                    <p><strong>Departamento:</strong> {funcionarioSelecionado.departamento}</p>
                                    <p><strong>Nota:</strong> {funcionarioSelecionado.nota}</p>
                                    <p><strong>Última Avaliação:</strong> {funcionarioSelecionado.ultima}</p>
                                    <p><strong>Observação:</strong> {funcionarioSelecionado.observacao}</p>
                                </div>
                                <div className="modal-footer">
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        data-bs-dismiss="modal"
                                    >
                                        Fechar
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DesempenhoFuncionarios