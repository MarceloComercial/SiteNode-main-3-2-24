
// Função para criar ou atualizar o gráfico
function criarOuAtualizarGrafico() {
  const canvas = document.getElementById("meuGrafico");

  // Verificar se o elemento canvas existe
  if (canvas) {
    // Obter o contexto do canvas
    const ctx = canvas.getContext("2d");

    // Verificar se o contexto do canvas foi obtido com sucesso
    if (ctx) {
      // Verificar se já existe um gráfico
      if (window.myChart) {
        // Se existir, destrua o gráfico anterior
        window.myChart.destroy();
      }

      // Dados do gráfico
      const data = {
        labels: [
          "Janeiro",
          "Fevereiro",
          "Março",
          "Abril",
          "Maio",
          "Junho",
          "Julho",
          "Agosto",
          "Setembro",
          "Outubro",
          "Novembro",
          "Dezembro",
        ],
        datasets: [
          {
            label: "Chamados Concluidos",
            data: [50, 60, 45, 80, 75, 50, 60, 45, 80, 75, 20, 30],
            backgroundColor: "rgba(24, 15, 201, 0.393)",
            borderColor: "rgba(70, 63, 188, 0.393)",
            borderWidth: 1,
          },
          {
            label: "Chamados Fechados",
            data: [20, 30, 3, 11, 75, 34, 56, 45, 12, 67, 20, 30],
            backgroundColor: "rgba(201, 15, 15, 0.393)",
            borderColor: "rgba(210, 81, 81, 0.393)",
            borderWidth: 1,
          },
        ],
      };

      // Opções do gráfico
      const options = {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      };

      // Criar o novo gráfico
      window.myChart = new Chart(ctx, {
        type: "bar",
        data: data,
        options: options,
      });
    } else {
      
    }
  } else {
    
  }
}

document.addEventListener("DOMContentLoaded", function () {
  // Função para carregar conteúdo
  // function carregarConteudo(pagina) {
  //   fetch(`/conteudo/${pagina}`)
  //     .then((response) => response.text())
  //     .then((html) => {
  //       document.getElementById("conteudo").innerHTML = html;

        

  //       // Salvar a página atual no localStorage
  //       localStorage.setItem("paginaAtual", pagina);

  //       // Modificar a URL sem adicionar um fragmento
  //       history.pushState({}, "", `/`);
  //     });
  // }

  // Chame a função para criar o gráfico após um pequeno atraso
  setTimeout(criarOuAtualizarGrafico, 100);

  // Adicionar eventos de clique
  document
    .getElementById("dashboardLink")
    .addEventListener("click", function() {
      carregarConteudo("dashboard");
    });


  // Adicionar eventos de clique
  document
    .getElementById("dashboardLink")
    .addEventListener("click", function () {
      carregarConteudo("dashboard");
    });

  document
    .getElementById("novochamadoLink")
    .addEventListener("click", function () {
      carregarConteudo("novochamado");
    });

  document.getElementById("editgroup").addEventListener("click", function () {
    
    carregarConteudo("editgrupos");
  });

  // Chamar a função para criar ou atualizar o gráfico ao carregar a página
  criarOuAtualizarGrafico();

  // Recuperar a página atual do localStorage ao carregar a página
  const paginaSalva = localStorage.getItem("paginaAtual");
  if (paginaSalva) {
    carregarConteudo(paginaSalva);
  }

  
});
