// Importa a classe 'Logar' do arquivo 'LoginModel.js'.
const Logar = require("../model/LoginModel");

// Controlador para renderizar a view de login.
exports.index = (req, res) => {
  if (req.session.user){
    res.render("index");
  }else{
    res.render("login");
  }// Renderiza a view "login" ao acessar a rota correspondente.
};

// Controlador para processar a tentativa de login.
exports.entrar = async function (req, res) {
  try {
    // Cria uma instância da classe 'Logar' com os dados recebidos no corpo da requisição.
    const login = new Logar(req.body);

    // Chama o método 'login' assíncrono da instância 'Logar'.
    await login.login();

    // Verifica se há erros durante o processo de login.
    if (login.erros.length > 0) {
      // Se houver erros, adiciona-os à mensagem flash de erros e redireciona de volta para a página de login.
      req.flash("erros", login.erros);
      req.session.save(function () {
        return res.redirect("/login");
      });
      return;
    }

    // Se não houver erros, exibe uma mensagem flash de sucesso e redireciona para a página principal.
    req.flash("success", "Você entrou no sistema.");
    req.session.user = login.user;
    req.session.save(function () {
      return res.redirect("/");
    });
  } catch (e) {
    // Em caso de exceção, loga o erro e renderiza a página de erro 404.
    console.log(e);
    return res.render("404");
  }
};

exports.logout = function (req, res) {
  req.session.destroy();
  res.redirect("/login");
};
