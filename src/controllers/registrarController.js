const { Registrar, RegisterModel } = require("../model/RegistrerModel"); // Importa a classe 'Registrar' do arquivo 'RegistrerModel.js'.

exports.index = (req, res) => {
  res.render("registrar"); // Renderiza a view "registrar" ao acessar a rota correspondente.
};

exports.register = async function (req, res) {
  try {
    const userreg = new Registrar(req.body); // Cria uma instância da classe 'Registrar' passando os dados da requisição (req.body).
    await userreg.register(); // Chama o método 'register' assíncrono da instância 'userreg'.

    if (userreg.erros.length > 0) {
      req.flash("erros", userreg.erros); // Se houver erros durante o registro, armazena os erros em um flash message.
      req.session.save(function () {
        return res.redirect("/registrar.setor.admin"); // Redireciona de volta para a página de registro.
      });
      return;
    }
    req.flash("success", 'Setor Adicionado com Sucesso.'); // Se o registro for bem-sucedido, armazena uma mensagem de sucesso em um flash message.
    req.session.save(function () {
      return res.redirect("/registrar.setor.admin"); // Redireciona de volta para a página de registro.
    });
  } catch (e) {
    console.log(e); // Se ocorrer um erro durante o processo, imprime o erro no console.
    return res.render("404"); // Renderiza a view "404" em caso de erro.
  }
};
