const { GrupoModel } = require("./Connections/connects");

class ObterGruposModel {
  async getOptions() {
    try {
      const todosGrupos = await GrupoModel.find({});
      return todosGrupos;
    } catch (error) {
      console.error("Erro ao obter grupos:", error);
      throw error;
    }
  }

  async getOptionsBySetor(value) {
    try {
      if (value.setor && Array.isArray(value.setor) && value.setor.length > 0) {
          var setor = value.setor; // Supondo que 'setor' seja um array
          // Resto do seu código que depende de 'setor'
          
          const todosGruposbysetor = await GrupoModel.find({ Nome: { $in: setor } }); // Usando 'Setores' em vez de 'setor'
          
          return todosGruposbysetor;
      }
    } catch (error) {
      console.error("Erro ao obter grupos:", error);
      throw error;
    }
  }
}

module.exports = ObterGruposModel;
