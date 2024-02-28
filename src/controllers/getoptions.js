
class AgendaController {
    constructor(model) {
      this.model = model;
    }
  
    async SelectOPT() {
      try {
        const setores = await this.model.getSetores(); // Substitua com a chamada ao banco de dados
        
        await this.insertSelectHTML(setores);
      } catch (err) {
        console.error(err);
      }
    }

  }
  
  module.exports = AgendaController;