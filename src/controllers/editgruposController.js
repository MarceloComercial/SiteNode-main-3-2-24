const GetGruposModel = require('../model/GetGruposModel');
const AgendaGrupoController = require('../controllers/getgruposController');

class AgendaController {
  constructor(model) {
    this.model = model;
    this.agendaGrupoController = new AgendaGrupoController(new GetGruposModel());
    
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
    const grupos = await agendaController.getGrupos();
    
    // Formatar os dados para um único array
    const gruposFormatados = grupos.map(grupo => ({
      id: grupo._id,
      nome: grupo.Nome,
      setores: Array.isArray(grupo.Setores) && grupo.Setores.length > 0 ? grupo.Setores.join(', ') : ''
    }));

    res.render("editgrupos" , {grupos : gruposFormatados , activePage: 'grupos' });
  
    
    next();
  };