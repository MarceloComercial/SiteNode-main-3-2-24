const  { RegisterGrupoModel } = require('./Connections/connects');

class UpdateGrupo {
    constructor(body) {
        this.body = body;
        this.erros = [];
        this.user = null;
    }

    async update() {
        this.cleanUp();
        if (this.erros.length > 0) return;

        await this.userExists();

        if (this.erros.length > 0) return;

        this.user = await RegisterGrupoModel.findOneAndUpdate(
            { _id: this.body._id }, // Use o ID do registro para identificá-lo
            { $set: { Nome: this.body.Nome, Setores: this.body.Setores } },
            { new: true } // Retorna o documento atualizado
        );
    }

    async userExists() {
        const user = await RegisterGrupoModel.findOne({ Nome: this.body.Nome, Setores: { $all: this.body.Setores } });

        if (user) this.erros.push('Grupo já existe.');
    }

    cleanUp() {
        this.body = {
            _id: this.body._id, // Inclua o ID do registro para identificação na atualização
            Nome: this.body.nome,
            Setores: this.body.setores
        };
    }
}

module.exports = UpdateGrupo;