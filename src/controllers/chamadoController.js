
const GetSetorModel = require('../model/GetOptionsGrupModel');
const GetSetorController = require('../controllers/getoptionsforgroupController');



class AgendaController {
  constructor(model) {
    this.model = model;
    
    this.getsetor = new GetSetorController(new GetSetorModel());
  }


  async getSetor() {
    try {
      const setores = await this.getsetor.getOptions();
      return setores;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

}

exports.index = async (req, res, next) => {
    const agendaController = new AgendaController(); // Crie uma instância do controlador
  

    const setor = await agendaController.getSetor();
    
  
    res.render("novochamado" , {setor : setor , activePage: 'chamado' });
    next();
  
};
