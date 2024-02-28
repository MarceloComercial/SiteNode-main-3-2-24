
const { GrupoModel } = require('./Connections/connects')

class GetGrupos {
    async getGrupos() {
      try {
        const grupos = await GrupoModel.find({}, { _id: 1 , Nome: 1, Setores: 1}).exec();
        return grupos;
      } catch (err) {
        console.error(err);
        throw err;
      }
    }
  }

module.exports = GetGrupos;