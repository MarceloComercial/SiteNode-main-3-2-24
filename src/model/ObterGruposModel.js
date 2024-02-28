const { GrupoModel } = require('./Connections/connects')

class ObterGruposModel {
  async getOptions() {
    try {
        const todosGrupos = await GrupoModel.find({});
        return todosGrupos;
      } catch (error) {
        console.error('Erro ao obter grupos:', error);
        throw error;
      }
  }
}

module.exports = ObterGruposModel;