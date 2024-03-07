const crypto = require("crypto");
const GetOptionsGroupModel = require("../model/GetOptionsGrupModel");
const ObterGruposModel = require("../model/ObterGruposModel");
const ObterUsesModel = require("../model/ObterUsersModel");
const ObterChamadosModel = require("../model/ObterChamadosModel");
const ObterChamadosBySetorModel = require("../model/ObterChamadosBySetorModel");

// Middleware global para configurar variáveis locais em todas as respostas
exports.middlewareGlobal = async (req, res, next) => {
  try {
    // Configura a variável 'user' localmente
    res.locals.user = req.session.user || ""; // Define como vazio se o usuário não estiver autenticado
    const user = res.locals.user;

    // Obtém opções de setores
    const setoresModel = new GetOptionsGroupModel();
    const setoresgrupo = await setoresModel.getOptions();
    res.locals.setores = setoresgrupo;

    // Obtém usuários formatados
    const buscauser = new ObterUsesModel();
    const usuarios = await buscauser.getOptions();
    const usuariosFormatados = usuarios.map((usuario) => ({
      id: usuario._id,
      email: usuario.email,
      setor: usuario.setor,
    }));
    res.locals.usuarios = usuariosFormatados;

    // Obtém chamados formatados
    const buscarchamados = new ObterChamadosModel();
    const chamados = await buscarchamados.getOptions(user);

    if (chamados && chamados.length > 0) {
      // Use o método map() apenas se chamados não for undefined e tiver itens
      const chamadosFormatados = chamados.map((chamadosF) => ({
        id: chamadosF._id,
        email: chamadosF.user,
        msg: chamadosF.mensagem,
        data: chamadosF.diamesano,
        setor: chamadosF.setor,
        status: chamadosF.status,
      }));
      res.locals.buscachamados = chamadosFormatados;
    } else {
      // Se não houver chamados, atribua um array vazio para evitar o erro
      res.locals.buscachamados = [];
    }


    // Obtém chamados por setor formatados
    if (user) {
      const buscarchamadosbysetor = new ObterChamadosBySetorModel();
      const chamadosbysetor = await buscarchamadosbysetor.getOptions(user);
      const chamadosFormatadosbysetor = chamadosbysetor.map((chamadosS) => ({
        id: chamadosS._id,
        email: chamadosS.user,
        msg: chamadosS.mensagem,
        data: chamadosS.diamesano,
        setor: chamadosS.setor,
        status: chamadosS.status,
      }));

      
      res.locals.buscabysetor = chamadosFormatadosbysetor;
    }

    // Obtém grupos formatados
    const busca = new ObterGruposModel();
    const grupos = await busca.getOptions();
    const gruposFormatados = grupos.map((grupo) => ({
      id: grupo._id,
      nome: grupo.Nome,
      grupos:
        Array.isArray(grupo.Setores) && grupo.Setores.length > 0
          ? grupo.Setores.join(", ")
          : "",
    }));
    res.locals.grupos = gruposFormatados;

    // Obtém grupos por usuário formatados
    const buscagruposbyuser = new ObterGruposModel();
    const gruposbyuser = await busca.getOptionsBySetor(user);

    if (gruposbyuser) {
      const gruposbyuserFormatados = gruposbyuser.map((grupo) => ({
        id: grupo._id,
        nome: grupo.Nome,
        grupos:
          Array.isArray(grupo.Setores) && grupo.Setores.length > 0
            ? grupo.Setores.join(", ")
            : "",
      }));
      res.locals.gruposbyuser = gruposbyuserFormatados;
  
      // Gera array de setores únicos
      const todosSetores = gruposbyuser.flatMap((doc) => doc.Setores);
      const setoresUnicos = [...new Set(todosSetores)];
      res.locals.sendbysetores = setoresUnicos;

      
      // Continue usando gruposbyuserFormatados
    } else {
      // Lide com a situação em que gruposbyuser é undefined
    }

    

    // Configura outras variáveis locais
    const nonce = crypto.randomBytes(16).toString("base64");
    res.locals.erros = req.flash("erros");
    res.locals.success = req.flash("success");
    res.locals.nonce = nonce;

    next(); // Chama a próxima função middleware na pilha
  } catch (err) {
    console.error(err);
    next(err);
  }
};

// Middleware para verificar erro CSRF
exports.checkCsrfError = (err, req, res, next) => {
  if (err) {
    return res.render("404"); // Renderiza a view "404" em caso de erro CSRF
  }
  next(); // Chama a próxima função middleware na pilha
};

// Middleware para adicionar token CSRF às variáveis locais
exports.csrfMiddleware = (req, res, next) => {
  res.locals.csrfToken = req.csrfToken(); // Adiciona o token CSRF aos locais (locals) da resposta
  next(); // Chama a próxima função middleware na pilha
};
