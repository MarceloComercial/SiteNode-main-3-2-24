const crypto = require("crypto");

const GetOptionsGroupModel = require('../model/GetOptionsGrupModel');
const ObterGruposModel = require('../model/ObterGruposModel');
const ObterUsesModel = require('../model/ObterUsersModel');
const ObterChamadosModel = require('../model/ObterChamadosModel');
const ObterChamadosBySetorModel = require('../model/ObterChamadosBySetorModel');



exports.middlewareGlobal = async (req, res, next) => {
  
  
  try {
    res.locals.user = req.session.user;
    user = res.locals.user;
    
    if (!user){
      user = "";
    }

    const setoresModel = new GetOptionsGroupModel();
    const setoresgrupo = await setoresModel.getOptions();

    const busca = new ObterGruposModel();
    const grupos = await busca.getOptions();

    const buscauser = new ObterUsesModel();
    const usuarios = await buscauser.getOptions();
    
     // Formatar os dados para um único array
    const usuariosFormatados = usuarios.map(usuario => ({
      id: usuario._id,
      email: usuario.email,
      setor: usuario.setor
    }));

    res.locals.usuarios = usuariosFormatados;
    

    const buscarchamados = new ObterChamadosModel();
    const chamados = await buscarchamados.getOptions(user);
    
    // Formatar os dados para um único array
    const chamadosFormatados = chamados.map(chamadosF => ({
      id: chamadosF._id,
      email: chamadosF.user,
      msg: chamadosF.mensagem,
      data: chamadosF.diamesano,
      setor: chamadosF.setor,
      status: chamadosF.status
    }));
    res.locals.buscachamados = chamadosFormatados;



    
    const buscarchamadosbysetor = new ObterChamadosBySetorModel();
  
    const chamadosbysetor = await buscarchamadosbysetor.getOptions(user);
    console.log("ola",user);
    
    // Formatar os dados para um único array
    if(user != ""){
      const buscarchamadosbysetor = new ObterChamadosBySetorModel();
  
      const chamadosbysetor = await buscarchamadosbysetor.getOptions(user);
      
      
      // Formatar os dados para um único array
      const chamadosFormatadosbysetor = chamadosbysetor.map(chamadosS => ({
        id: chamadosS._id,
        email: chamadosS.user,
        msg: chamadosS.mensagem,
        data: chamadosS.diamesano,
        setor: chamadosS.setor,
        status: chamadosS.status
      }));
      

      
      res.locals.buscabysetor = chamadosFormatadosbysetor;
    }

   
    // Formatar os dados para um único array
    const gruposFormatados = grupos.map(grupo => ({
      id: grupo._id,
      nome: grupo.Nome,
      grupos: Array.isArray(grupo.Setores) && grupo.Setores.length > 0 ? grupo.Setores.join(', ') : ''
    }));
    
    res.locals.grupos = gruposFormatados;
   
    // Adicione a variável 'setores' aos locais (locals) da resposta.
    res.locals.setores = setoresgrupo;

    // Variáveis existentes no seu middleware global
    const nonce = crypto.randomBytes(16).toString("base64");
    res.locals.erros = req.flash("erros");
    res.locals.success = req.flash("success");
    

    res.locals.nonce = nonce;

    next(); // Chama a próxima função middleware na pilha.
  } catch (err) {
    console.error(err);
    next(err);
  }
};

exports.checkCsrfError = (err, req, res, next) => {
  if (err) {
    return res.render("404"); // Renderiza a view "404" em caso de erro CSRF (Cross-Site Request Forgery).
  }
  next(); // Chama a próxima função middleware na pilha.
};

exports.csrfMiddleware = (req, res, next) => {
  res.locals.csrfToken = req.csrfToken(); // Adiciona o token CSRF aos locais (locals) da resposta.
  next(); // Chama a próxima função middleware na pilha.
};
