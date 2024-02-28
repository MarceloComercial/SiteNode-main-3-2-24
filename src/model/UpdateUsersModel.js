const bcryptjs = require('bcryptjs');
const validator = require('validator')
const { RegisterModel } = require('./Connections/connects');

class UpdateUser {
    constructor(body) {
        this.body = body;
        this.erros = [];
        this.user = null;
    }

    async update() {
        this.valida()
        if (this.erros.length > 0) return;

        this.cleanUp();
        if (this.erros.length > 0) return;

        await this.userExists();

        if (this.erros.length > 0) return;

        const salt = bcryptjs.genSaltSync(); // Gera um "salt" para ser usado no processo de hash da senha.
        this.body.senha = bcryptjs.hashSync(this.body.senha, salt); // Realiza o hash da senha usando o "salt" gerado.

        this.user = await RegisterModel.findOneAndUpdate(
            { _id: this.body._id }, // Use o ID do registro para identificá-lo
            {$set: { email: this.body.email, password: this.body.senha,setor: this.body.setor } }
            
            
        );
    }

    valida(){
        // Validação dos campos
        this.cleanUp(); // Chama o método para limpar e ajustar os dados.

        if(!validator.isEmail(this.body.email)) this.erros.push('E-mail inválido'); // Valida o formato do email.

        if(this.body.senha.length < 3 || this.body.senha.length > 50) this.erros.push('A senha precisa ter entre 3 e 50 caracteres.'); // Valida o comprimento da senha.
    }

    async userExists() {
        const user = await RegisterModel.findOne({ email: this.body.email });

        if (!user) this.erros.push('Usuario não exite.');
    }

    cleanUp() {
        this.body = {
            _id: this.body._id, // Inclua o ID do registro para identificação na atualização
            email: this.body.email,
            senha: this.body.senha,
            setor: this.body.setor
        };
    }
}

module.exports = UpdateUser;