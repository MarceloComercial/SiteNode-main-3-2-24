// Importa as bibliotecas necessárias
const mongoose = require("mongoose"); // Mongoose para interação com MongoDB
const validator = require("validator"); // Validator para validação de dados
const bcryptjs = require("bcryptjs"); // Bcrypt.js para hashing de senhas
const { Registrar } = require("./RegistrerModel"); // Importa a classe Registrar e o modelo RegisterModel de outro arquivo
const { RegisterModel } = require("./Connections/connects"); // Importa a classe Registrar e o modelo RegisterModel de outro arquivo

// Definição da classe Logar
class Logar {
  constructor(body) {
    this.body = body; // Atribui o corpo da requisição ao objeto da classe.
    this.erros = []; // Inicializa um array para armazenar erros de validação.
    this.user = null; // Inicializa a variável para armazenar informações do usuário.
  }

  // Método assíncrono para realizar o processo de login
  async login() {
    this.valida(); // Chama o método valida() para realizar a validação dos dados
    if (this.erros.length > 0) return; // Se houver erros, encerra o método

    try {
      // Procura um usuário no banco de dados com o e-mail fornecido
      this.user = await RegisterModel.findOne({ email: this.body.email });

      // Se o usuário não existir, adiciona um erro
      if (!this.user) {
        this.erros.push("Usuário não existe.");
        return;
      }

      // Compara a senha fornecida com a senha armazenada no banco usando bcrypt
      const senhaValida = await bcryptjs.compare(
        this.body.password,
        this.user.password
      );

      // Se a senha for inválida, adiciona um erro
      if (!senhaValida) {
        this.erros.push("Usuario ou Senha Invalida!");
        this.user = null;
        return;
      }

      // Se chegou até aqui, o login foi bem-sucedido

    } catch (error) {
      // Em caso de erro durante a execução, adiciona um erro genérico
      console.error(error);
      this.erros.push("Erro durante a autenticação");
      this.user = null;
    }
  }

  // Método para realizar a validação dos dados de entrada
  valida() {
    this.cleanUp(); // Chama o método cleanUp() para limpar e padronizar os dados

    // Validação
    // O e-mail precisa ser válido
    if (!validator.isEmail(this.body.email)) this.erros.push("E-mail inválido");

    // A senha precisa ter entre 3 e 50 caracteres
    if (this.body.password.length < 3 || this.body.password.length > 50) {
      this.erros.push("A senha precisa ter entre 3 e 50 caracteres.");
    }
  }

  // Método para limpar e padronizar os dados de entrada
  cleanUp() {
    for (const key in this.body) {
      if (typeof this.body[key] !== "string") {
        this.body[key] = "";
      }
    }

    // Cria um novo objeto body apenas com as propriedades necessárias
    this.body = {
      email: this.body.email,
      password: this.body.senha,
    };
  }
}

// Exporta a classe Logar para ser utilizada em outros arquivos
module.exports = Logar;
