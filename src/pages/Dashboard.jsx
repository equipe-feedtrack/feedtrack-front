import React, { useEffect, useRef, useState } from "react";
import NavBar from "../components/NavBar";
import "./css/dashboard.css";
import { Chart } from "chart.js/auto"; // Importe a classe Chart

function Dashboard() {
  // Estados para armazenar os dados
  const [totalFeedbacks, setTotalFeedbacks] = useState([0]);
  const [taxaRespostaPercentual, setTaxaRespostaPercentual] = useState("0.00");
  const [satisfacaoMedia, setSatisfacaoMedia] = useState("0.00");
  const [alertasNaoRespondidos, setAlertasNaoRespondidos] = useState(0);
  const [feedbacksRecentes, setFeedbacksRecentes] = useState([]);
  const [palavrasPositivas, setPalavrasPositivas] = useState([
    { text: "ótimo", value: 15 },
    { text: "excelente", value: 12 },
    { text: "rápido", value: 10 },
    { text: "adorei", value: 9 },
    { text: "bom", value: 8 },
  ]);
  const [palavrasNegativas, setPalavrasNegativas] = useState([
    { text: "demorado", value: 7 },
    { text: "ruim", value: 6 },
    { text: "péssimo", value: 5 },
    { text: "insatisfeito", value: 4 },
    { text: "problema", value: 3 },
  ]);

  // Referências para os elementos canvas e instâncias dos gráficos
  const pizzaChartRef = useRef(null);
  const linhaChartRef = useRef(null);
  const barraProdutoChartRef = useRef(null);
  const pizzaChartInstance = useRef(null);
  const linhaChartInstance = useRef(null);
  const barraProdutoChartInstance = useRef(null);

  useEffect(() => {
    // Dados de exemplo (substitua pelos seus dados reais)
    const dadosTotalFeedbacks = [150];
    const dadosTaxaResposta = { respondidos: 120, totalContatados: 150 };
    const notasSatisfacao = [4, 5, 3, 5, 4, 4, 5, 3, 2, 4];
    const tendenciaSatisfacao = [
      { mes: "Jan", media: 3.8 },
      { mes: "Fev", media: 4.1 },
      { mes: "Mar", media: 3.9 },
      { mes: "Abr", media: 4.3 },
      { mes: "Mai", media: 4.0 },
    ];
    const sentimentos = { positivo: 70, negativo: 20, neutro: 60 };

    const dadosFeedbacksRecentes = [
      { data: "2023-10-26", produto: "Produto A", comentario: "Muito bom!" },
      { data: "2023-10-25", produto: "Serviço B", comentario: "Poderia melhorar." },
      { data: "2023-10-24", produto: "Produto C", comentario: "Excelente atendimento." },
    ];
    const dadosAlertasPendencias = { negativosUrgentes: 5, naoRespondidos: 12 };
    const satisfacaoPorProduto = [
      { produto: "Produto A", media: 4.5 },
      { produto: "Produto B", media: 3.8 },
      { produto: "Produto C", media: 4.2 },
    ];

    

    // Atualiza os estados com os dados
    setTotalFeedbacks(dadosTotalFeedbacks);
    setTaxaRespostaPercentual(((dadosTaxaResposta.respondidos / dadosTaxaResposta.totalContatados) * 100).toFixed(2));
    setSatisfacaoMedia((notasSatisfacao.reduce((a, b) => a + b, 0) / notasSatisfacao.length).toFixed(2));
    setAlertasNaoRespondidos(dadosAlertasPendencias.naoRespondidos);
    setFeedbacksRecentes(dadosFeedbacksRecentes);

    // --- Gráfico de Pizza (Análise de Sentimento) ---
    const pizzaChartCanvas = pizzaChartRef.current?.getContext("2d");
    if (pizzaChartCanvas) {
      if (pizzaChartInstance.current) {
        pizzaChartInstance.current.destroy();
      }
      pizzaChartInstance.current = new Chart(pizzaChartCanvas, {
        type: "pie",
        data: {
          labels: ["Positivo", "Negativo", "Neutro"],
          datasets: [
            {
              label: "Sentimento dos Feedbacks",
              data: [sentimentos.positivo, sentimentos.negativo, sentimentos.neutro],
              backgroundColor: [
                "rgba(75, 192, 192, 0.6)",
                "rgba(255, 99, 132, 0.6)",
                "rgba(255, 206, 86, 0.6)",
              ],
              borderColor: ["rgba(75, 192, 192, 1)", "rgba(255, 99, 132, 1)", "rgba(255, 206, 86, 1)"],
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { position: "bottom" },
            title: { display: true, text: "Análise de Sentimento dos Feedbacks" },
          },
        },
      });
    }

    // --- Gráfico de Linha (Tendência de Satisfação) ---
    const linhaChartCanvas = linhaChartRef.current?.getContext("2d");
    if (linhaChartCanvas) {
      if (linhaChartInstance.current) {
        linhaChartInstance.current.destroy();
      }
      linhaChartInstance.current = new Chart(linhaChartCanvas, {
        type: "line",
        data: {
          labels: tendenciaSatisfacao.map((item) => item.mes),
          datasets: [
            {
              label: "Satisfação Média",
              data: tendenciaSatisfacao.map((item) => item.media),
              borderColor: "rgba(54, 162, 235, 1)",
              backgroundColor: "rgba(54, 162, 235, 0.2)",
              borderWidth: 2,
              pointRadius: 5,
              pointBackgroundColor: "rgba(54, 162, 235, 1)",
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: { display: true, text: "Tendência de Satisfação ao Longo do Tempo" },
          },
          scales: {
            y: { beginAtZero: true, title: { display: true, text: "Média de Satisfação" } },
            x: { title: { display: true, text: "Mês" } },
          },
        },
      });
    }

    // --- Gráfico de Barras (Comparativo de Satisfação por Produto) ---
    const barraProdutoChartCanvas = barraProdutoChartRef.current?.getContext("2d");
    if (barraProdutoChartCanvas) {
      if (barraProdutoChartInstance.current) {
        barraProdutoChartInstance.current.destroy();
      }
      barraProdutoChartInstance.current = new Chart(barraProdutoChartCanvas, {
        type: "bar",
        data: {
          labels: satisfacaoPorProduto.map((item) => item.produto),
          datasets: [
            {
              label: "Satisfação Média por Produto",
              data: satisfacaoPorProduto.map((item) => item.media),
              backgroundColor: "rgba(255, 159, 64, 0.6)",
              borderColor: "rgba(255, 159, 64, 1)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: { display: true, text: "Comparativo de Satisfação por Produto" },
          },
          scales: {
            y: { beginAtZero: true, title: { display: true, text: "Média de Satisfação" } },
            x: { title: { display: true, text: "Produto" } },
          },
        },
      });
    }

    // Função de limpeza para destruir os gráficos quando o componente for desmontado
    return () => {
      if (pizzaChartInstance.current) {
        pizzaChartInstance.current.destroy();
      }
      if (linhaChartInstance.current) {
        linhaChartInstance.current.destroy();
      }
      if (barraProdutoChartInstance.current) {
        barraProdutoChartInstance.current.destroy();
      }
    };
  }, []);

  

  return (
    <div>
      <NavBar />
      <div className="container-fluid p-4">
        <div className="row">
          <div className="card col-lg-3 col-md-6 col-sm-12 mb-3">
            <h3 className="text-dark text-center">Total de feedbacks recebidos</h3>
            <p className="lead text-center">{totalFeedbacks[0]}</p>
          </div>
          <div className="card col-lg-3 col-md-6 col-sm-12 mb-3">
            <h3 className="text-dark text-center">Taxa de Resposta</h3>
            <p className="lead text-center">{taxaRespostaPercentual}%</p>
          </div>
          <div className="card col-lg-3 col-md-6 col-sm-12 mb-3">
            <h3 className="text-dark text-center">Satisfação Geral (Média)</h3>
            <p className="lead text-center">{satisfacaoMedia}</p>
          </div>
          <div className="card col-lg-3 col-md-6 col-sm-12 mb-3">
            <h3 className="text-dark text-center">Alertas Não Respondidos</h3>
            <p className="lead text-center">{alertasNaoRespondidos}</p>
          </div>
        </div>

        <div className="row">
          <div className="card col-lg-2 col-md-6 col-sm-12 mb-3">
            <canvas ref={pizzaChartRef} id="pizzaChart" width="400"></canvas>
          </div>
          <div className="card col-lg-6 col-md-6 col-sm-12 mb-3">
            <canvas ref={linhaChartRef} id="linhaChart" width="400" height="300"></canvas>
          </div>
          <div className="card col-lg-4 col-md-12 col-sm-12 mb-3">
            <h3>Feedbacks Recentes</h3>
            <ul className="list-group">
              {feedbacksRecentes.map((feedback, index) => (
                <li key={index} className="list-group-item">
                  <p className="mb-1"><strong>Data:</strong> {feedback.data}</p>
                  {feedback.produto && <p className="mb-1"><strong>Produto:</strong> {feedback.produto}</p>}
                  <p className="mb-0"><strong>Comentário:</strong> {feedback.comentario}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="row">
            <div className="d-flex flex-column col-lg-8 col-md-12 col-sm-12 mb-3"> 
              <div className="mb-3 h-100">
                <h3 className="text-dark text-center">Palavras Positivas</h3>
                <ul className="list-group">
                  {palavrasPositivas.map((palavra, index) => (
                    <li key={index} className="list-group-item">
                      {palavra.text} ({palavra.value})
                    </li>
                  ))}
                </ul>
              </div>
              <div className=" mb-3 h-100">
                <h3 className="text-dark text-center">Palavras Negativas</h3>
                <ul className="list-group">
                  {palavrasNegativas.map((palavra, index) => (
                    <li key={index} className="list-group-item">
                      {palavra.text} ({palavra.value})
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          <div className="card col-lg-4 col-md-12 col-sm-12 mb-3">
            <canvas ref={barraProdutoChartRef} id="barraProdutoChart" width="400" height="400"></canvas>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;