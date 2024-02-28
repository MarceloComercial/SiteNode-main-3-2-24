class AgendaGrupoController {
    constructor(model) {
      this.model = model;
    }
  
    async getGrupos() {
      try {
        const grupos = await this.model.getGrupos();
        return grupos;
      } catch (err) {
        console.error(err);
        throw err;
      }
    }
  }
  
  module.exports = AgendaGrupoController;