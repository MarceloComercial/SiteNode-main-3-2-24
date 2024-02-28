const { RegisterModelRespostaChamado } = require("../model/Connections/connects"); // Importe o modelo RegisterModelChamado

class UpdateChamado {
    constructor(body) {
        this.body = body;
        this.erros = [];
        this.user = null;
    }

    async update() {
        this.cleanUp();
        if (this.erros.length > 0) return;

        try {
            // Crie um novo documento de resposta de usuário
            const novaResposta = new RegisterModelRespostaChamado({
                chamadoId: this.body._id, // Use o ID do chamado
                nomeUsuario: this.body.Email, // Nome do usuário
                mensagem: this.body.resposta // Mensagem ou resposta
            });

            // Salve a nova resposta no banco de dados
            await novaResposta.save();
        } catch (error) {
            console.error("Erro ao salvar a resposta:", error);
            this.erros.push('Erro ao salvar a resposta.');
        }
    }

    async userExists() {
        const user = await RegisterModelChamado.findOne({ _id: this.body._id });
        if (!user) this.erros.push('Chamado não existe.');
    }

    cleanUp() {
        this.body = {
            _id: this.body._id, // Inclua o ID do registro para identificação na atualização
            resposta: this.body.resposta,
            Email: this.body.emailchamado,
        };
    }
}

module.exports = UpdateChamado;
