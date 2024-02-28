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

  $(document).on("click", ".btn-editar-user", function () {
   
    const nome = $(this).data("nome");
    const setores = $(this).data("setor");
    const id = $(this).data("id");
    
    // Preencha os campos do modal com os valores correspondentes
    $("#namemodel").val(nome);
    $("#idmodel").val(id);

    $("#modaleditgroup").modal("show");
  });
  $(document).on("click", ".btn-remove-user", function () {
    // Recupere dados personalizados do botão
    const id = $(this).data("id");
    
    $("#idremove").val(id);

    $("#modalremovegroup").modal("show");
  });
});
