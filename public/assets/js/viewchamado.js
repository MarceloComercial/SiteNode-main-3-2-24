document.addEventListener("DOMContentLoaded", function () {
  new DataTable("#example", {
    pagingType: "full_numbers",

    language: {
      decimal: "",
      emptyTable: "No data available in table",
      info: "Mostrando _START_ de _END_ No Total de _TOTAL_ Entradas",
      infoEmpty: "Mostrando 0 de 0 em 0 resultados",
      infoFiltered: "(filtered from _MAX_ total entries)",
      infoPostFix: "",
      thousands: ",",
      lengthMenu: "Mostrar até _MENU_",
      loadingRecords: "Loading...",
      processing: "",
      search: "Procurar:",
      zeroRecords: "No matching records found",
      paginate: {
        first: "Primeiro",
        last: "Ultimo",
        next: "Proximo",
        previous: "Anterior",
      },
      aria: {
        sortAscending: ": activate to sort column ascending",
        sortDescending: ": activate to sort column descending",
      },
    },
  });

  $(document).on("click", ".btn-editar-chamado", function () {
    const id = $(this).data("id");
    const email = $(this).data("email");
    const data = $(this).data("data");
    const msg = $(this).data("msg");

    $("#idmodal").val(id);
    $("#emailmodal").text(email);
    $("#emailchamado").val(email);

    $("#datamodal").text(data);
    $("#msgmodal").text(msg);

    $("#respostasChamado").empty();
    // Fazer uma solicitação AJAX para recuperar as respostas
    $.ajax({
      url: "/recuperar-respostas",
      type: "GET",
      data: { id: id }, // Enviar o ID do chamado para o servidor
      success: function (respostas) {
        
        // Iterar sobre as respostas e exibi-las na interface do usuário
        respostas.forEach(function (resposta) {
          const respostaHTML = `<div>${resposta.nomeUsuario}: ${resposta.mensagem}</div>`;
         
          $("#respostasChamado").append(respostaHTML);
        });
      },
      error: function (error) {
        console.error("Erro ao recuperar as respostas:", error);
      },
    });

    $("#modalviewchamado").modal("show");
  });
});
