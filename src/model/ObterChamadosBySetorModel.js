const { RegisterModelChamado } = require("./Connections/connects");

class ObterGruposModel {
  async getOptions(value) {
    try {
      if (value.setor && Array.isArray(value.setor) && value.setor.length > 0) {
        var setor = value.setor[0];
        // Resto do seu código que depende de 'setor'
        const todosGrupos = await RegisterModelChamado.find({ setor: setor });

        return todosGrupos;
      } 
      
      
    } catch (error) {
      console.error("Erro ao obter grupos:", error);
      throw error;
    }
  }
}

module.exports = ObterGruposModel;
