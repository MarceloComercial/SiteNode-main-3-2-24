const { Setores } = require('./Connections/connects')

class GetOptionsGroupModel {
  async getOptions() {
    try {
      const setores = await Setores.distinct('cadastro_setor');
      
      return setores;
    } catch (err) {
      
      throw err;
    }
  }
}

module.exports = GetOptionsGroupModel;