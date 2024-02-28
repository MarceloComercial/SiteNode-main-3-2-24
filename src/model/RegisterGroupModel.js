const { RegisterGrupoModel } = require('./Connections/connects')

class Registrar {
    constructor(body){
        this.body = body; // Atribui o corpo da requisição ao objeto da classe.
        this.erros = []; // Inicializa um array para armazenar erros de validação.
        this.user = null; // Inicializa a variável para armazenar informações do usuário.
    }

    async register(){
        this.cleanUp(); // Chama o método para validar os campos.
        if(this.erros.length > 0 ) return; // Se houver erros de validação, interrompe o registro.

        await this.userExists(); // Verifica se o usuário já existe no banco de dados.

        if(this.erros.length > 0 ) return; // Se o usuário já existe, interrompe o registro.
        
        this.user = await RegisterGrupoModel.create(this.body); // Cria um novo registro no banco de dados usando o modelo 'RegisterModel'.
        
    }

    async userExists() {
        const user = await RegisterGrupoModel.findOne({ Nome: this.body.Nome, Setores: { $all: this.body.Setores } });
      
        if (user) this.erros.push('Grupo já existe.');
      }


    cleanUp(){   
        this.body = {
            Nome : this.body.nome,
            Setores : this.body.setores // Corrige o nome do campo 'senha' para 'password'.
           
        };
    }
}

module.exports = { Registrar };