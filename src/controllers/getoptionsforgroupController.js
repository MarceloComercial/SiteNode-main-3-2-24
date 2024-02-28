class GetOptionsForGroupController {
  constructor(model) {
    this.model = model;
  }

  async getOptions() {
    try {
      // Usar o método getOptions do modelo
      const setores = await this.model.getOptions();
      return setores;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}

  
module.exports = GetOptionsForGroupController;