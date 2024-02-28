// script.js
document.addEventListener("DOMContentLoaded", function() {
    // Dados do gráfico
    const data = {
      labels: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio"],
      datasets: [{
        label: "Vendas Mensais",
        data: [50, 60, 45, 80, 75],
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1
      }]
    };
  
    // Opções do gráfico
    const options = {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    };
  
    // Configurações e criação do gráfico
    const ctx = document.getElementById("meuGrafico").getContext("2d");
    const myChart = new Chart(ctx, {
      type: 'bar',
      data: data,
      options: options
    });
  });