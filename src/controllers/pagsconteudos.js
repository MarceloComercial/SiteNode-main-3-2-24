const { Registrar, RegisterModel } = require("../model/RegistrerModel");

const GetOptionsGroupModel = require('../model/GetOptionsGrupModel');
const GetOptionsForGroupController = require('../controllers/getoptionsforgroupController');


const GetGruposModel = require('../model/GetGruposModel');
const AgendaGrupoController = require('../controllers/getgruposController');



const obterConteudo = (pagina) => {
  // Lógica para obter o conteúdo com base na página
  return `Conteúdo dinâmico para a página ${pagina}`;
};

class AgendaController {
  constructor(model) {
    this.model = model;
    this.agendaGrupoController = new AgendaGrupoController(new GetGruposModel());
  }

  async getOptions() {
    try {
      const setores = await RegisterModel.distinct("setores"); // Use o método distinct para obter valores únicos
      return setores;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async getGrupos() {
    try {
      const grupos = await this.agendaGrupoController.getGrupos();
      return grupos;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}

exports.index = async (req, res, next) => {
  const agendaController = new AgendaController(); // Crie uma instância do controlador
  const setores = await agendaController.getOptions(); // Obtenha os setores

  const grupos = await agendaController.getGrupos();
  
  // Formatar os dados para um único array
  const gruposFormatados = grupos.map(grupo => ({
    id: grupo._id,
    nome: grupo.Nome,
    setores: Array.isArray(grupo.Setores) && grupo.Setores.length > 0 ? grupo.Setores.join(', ') : ''
  }));
 
  const pagina = req.params.pagina;
  
  if (pagina == "dashboard") {
    res.render("dashboard", { content: obterConteudo(pagina) });
    next();
  } else if (pagina == "novochamado") {
    res.render("novochamado", { content: obterConteudo(pagina), setor: setores  });
    next();
  } else if (pagina == "editgrupos"){
  
    res.render("editgrupos", { content: obterConteudo(pagina), grupos: gruposFormatados  , setor: setores});
    next();
  }
};
