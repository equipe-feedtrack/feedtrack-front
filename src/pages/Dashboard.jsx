import React, { useEffect, useRef } from "react";
import NavBar from "../components/NavBar";
import './css/dashboard.css';
import { Chart } from 'chart.js/auto'; // Importe a classe Chart
import { useNavigate } from 'react-router-dom';

function Dashboard() {

  const navigate = useNavigate();

  const options = {
    devicePixelRatio: 2,
    responsive: true,
    maintainAspectRatio: false
  };

  // Criamos refs para os elementos canvas
  const idiomasChartRef = useRef(null);
  const atividadesChartRef = useRef(null);
  const receitaChartRef = useRef(null);
  const crescimentoChartRef = useRef(null);

  // Criamos refs para as instâncias dos gráficos
  const idiomasChartInstance = useRef(null);
  const atividadesChartInstance = useRef(null);
  const receitaChartInstance = useRef(null);
  const crescimentoChartInstance = useRef(null);

  useEffect(() => {
    const idiomasCtx = idiomasChartRef.current?.getContext('2d');
    const atividadesCtx = atividadesChartRef.current?.getContext('2d');
    const receitaCtx = receitaChartRef.current?.getContext('2d');
    const crescimentoCtx = crescimentoChartRef.current?.getContext('2d');

    if (idiomasCtx) {
      if (idiomasChartInstance.current) {
        idiomasChartInstance.current.destroy(); // Destrói o gráfico existente
      }
      idiomasChartInstance.current = new Chart(idiomasCtx, {
        type: 'pie',
        data: {
          labels: ['Camisa', 'Tênis', 'Short', 'Boné'],
          datasets: [{
            data: [300, 150, 100, 50],
            backgroundColor: ['#ffc107', '#fff', '#555', '#1a1a1a']
          }]
        },
        options
      });
    }

    if (atividadesCtx) {
      if (atividadesChartInstance.current) {
        atividadesChartInstance.current.destroy(); // Destrói o gráfico existente
      }
      atividadesChartInstance.current = new Chart(atividadesCtx, {
        type: 'bar',
        data: {
          labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
          datasets: [{
            label: 'Atividades',
            data: [50, 60, 70, 90, 110, 120],
            backgroundColor: ['#ffc107']
          }]
        },
        options
      });
    }

    if (receitaCtx) {
      if (receitaChartInstance.current) {
        receitaChartInstance.current.destroy(); // Destrói o gráfico existente
      }
      receitaChartInstance.current = new Chart(receitaCtx, {
        type: 'line',
        data: {
          labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
          datasets: [{
            label: 'Receita',
            data: [5000, 7000, 8000, 10000, 12000, 15000],
            borderColor: '#ffc107',
            backgroundColor: 'rgba(255, 193, 7, 0.2)',
            tension: 0.3
          }]
        },
        options
      });
    }

    if (crescimentoCtx) {
      if (crescimentoChartInstance.current) {
        crescimentoChartInstance.current.destroy(); // Destrói o gráfico existente
      }
      crescimentoChartInstance.current = new Chart(crescimentoCtx, {
        type: 'radar',
        data: {
          labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
          datasets: [{
            label: 'Crescimento',
            data: [15, 20, 25, 30, 35, 40],
            borderColor: '#ffc107',
            backgroundColor: 'rgba(255, 193, 7, 0.3)'
          }]
        },
        options
      });
    }

    // Função de limpeza do useEffect
    return () => {
      if (idiomasChartInstance.current) {
        idiomasChartInstance.current.destroy();
        idiomasChartInstance.current = null;
      }
      if (atividadesChartInstance.current) {
        atividadesChartInstance.current.destroy();
        atividadesChartInstance.current = null;
      }
      if (receitaChartInstance.current) {
        receitaChartInstance.current.destroy();
        receitaChartInstance.current = null;
      }
      if (crescimentoChartInstance.current) {
        crescimentoChartInstance.current.destroy();
        crescimentoChartInstance.current = null;
      }
    };
  }, [options]); // Executa o efeito quando as 'options' mudam (ou na montagem)

  function navegar(path) {
    return () => {
      navigate(path);
    };
  }

  const style = {
    cursor: 'pointer',
  }

  return (
    <div>
      <NavBar/>
      <main className="col-10 container-fluid">
        <div className="flex-grow-1">
          <div className="container mt-4">
            <div className="row text-center">
              <div className="col-md-4">
                <div className="card">
                  <div className="card-body" style={style} onClick={navegar('/registro-feedback')} >
                    <h5 className="card-title ">Feedbacks</h5>
                    <h2 className="text-light "><i className="fas fa-comments text-warning"></i> 150</h2>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card">
                  <div className="card-body" style={style} onClick={navegar('/cadastro-cliente')} >
                    <h5 className="card-title">Clientes</h5>
                    <h2 className="text-light"><i className="fas fa-users text-warning"></i> 300</h2>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card">
                  <div className="card-body" style={style} onClick={navegar('/cadastro-produto')} >
                    <h5 className="card-title">Produtos</h5>
                    <h2 className="text-light"><i className="fas fa-box text-warning"></i> 50</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="container mt-5" id="graficos">
            <div className="row">
              <div className="col-md-6">
                <div className="card">
                  <div className="card-header">Produtos</div>
                  <div className="card-body">
                    <canvas ref={idiomasChartRef} id="idiomasChart"></canvas>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card">
                  <div className="card-header">Atividades Mensais</div>
                  <div className="card-body">
                    <canvas ref={atividadesChartRef} id="atividadesChart"></canvas>
                  </div>
                </div>
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-md-6">
                <div className="card">
                  <div className="card-header">Receita</div>
                  <div className="card-body">
                    <canvas ref={receitaChartRef} id="receitaChart"></canvas>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card">
                  <div className="card-header">Crescimento de Usuários</div>
                  <div className="card-body">
                    <canvas ref={crescimentoChartRef} id="crescimentoChart"></canvas>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;