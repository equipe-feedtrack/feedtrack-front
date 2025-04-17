const options = {
    devicePixelRatio: 2, 
    responsive: true,
    maintainAspectRatio: false
};

const idiomasCtx = document.getElementById('idiomasChart').getContext('2d');
new Chart(idiomasCtx, {
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

const atividadesCtx = document.getElementById('atividadesChart').getContext('2d');
new Chart(atividadesCtx, {
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

const receitaCtx = document.getElementById('receitaChart').getContext('2d');
new Chart(receitaCtx, {
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

const crescimentoCtx = document.getElementById('crescimentoChart').getContext('2d');
new Chart(crescimentoCtx, {
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