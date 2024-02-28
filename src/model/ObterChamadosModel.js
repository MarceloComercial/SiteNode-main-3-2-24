const { RegisterModelChamado } = require('./Connections/connects')

class ObterGruposModel {
  async getOptions(user) {
   
    try {
        const todosGrupos = await RegisterModelChamado.find({user : user.email });
        return todosGrupos;
      } catch (error) {
        console.error('Erro ao obter grupos:', error);
        throw error;
      }
  }
}

module.exports = ObterGruposModel;