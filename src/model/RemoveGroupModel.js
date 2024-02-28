const { RegisterGrupoModel } = require('./Connections/connects')

class Remove {
    constructor(body){
        this.body = body; // Atribui o corpo da requisição ao objeto da classe.
        this.erros = []; // Inicializa um array para armazenar erros de validação.
        this.user = null; // Inicializa a variável para armazenar informações do usuário.
    }

    async remove(){
        this.cleanUp(); // Chama o método para validar os campos.
        
        if(this.erros.length > 0 ) return; // Se houver erros de validação, interrompe o registro.

        await this.userExists(); // Verifica se o usuário já existe no banco de dados.

        if(this.erros.length > 0 ) return; // Se o usuário já existe, interrompe o registro.
        
        this.user = await RegisterGrupoModel.deleteOne({ _id: this.body._id }); // Cria um novo registro no banco de dados usando o modelo 'RegisterModel'.
        
    }

    async userExists() {
        
        const user = await RegisterGrupoModel.findOne({ _id: this.body._id});
      
        if (!user) this.erros.push('Grupo não existente.');
      }


    cleanUp(){   
        
        this.body = {
            _id: this.body._id, // Inclua o ID do registro para identificação na atualização
            
        };
        
    }
}

module.exports = { Remove };