const { RegisterModelChamado } = require('./Connections/connects')

class ObterGruposModel {
  async getOptions(value) {
   
    try {
        
        var setor = value.setor[0];
        const todosGrupos = await RegisterModelChamado.find({setor : setor });
        
        return todosGrupos;
      } catch (error) {
        console.error('Erro ao obter grupos:', error);
        throw error;
      }
  }
}

module.exports = ObterGruposModel;