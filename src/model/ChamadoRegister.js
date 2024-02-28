const { RegisterModelChamado, GrupoModel } = require("./Connections/connects");

class RegistrarChamado {
  constructor(body) {
    this.body = body;
    this.erros = [];
    this.user = null;
    this.setoresbysort = null; // Adiciona uma propriedade para armazenar os setores.
  }

  async register() {
    await this.valida(); // Aguarda a validação antes de prosseguir.
    if (this.erros.length > 0) return;

    this.user = await RegisterModelChamado.create(this.body);
  }

  async verify(){
    try {
      var setores = await GrupoModel.findOne({ Nome: this.body.gruposetor });
      this.setoresbysort = setores.Setores; // Armazena os setores na propriedade da classe.
      return this.setoresbysort;
    } catch (error) {
      console.error("Erro ao verificar grupo:", error);
      throw error;
    }
  }

  async valida() {
    if (
      this.body.user == "" ||
      this.body.message == "" ||
      this.body.setorname == ""
    )
      this.erros.push("Todos os campos devem ser preenchidos");

    await this.cleanUp(); // Aguarda o cleanUp para garantir que os dados estejam prontos.
  }

  async cleanUp() {
    for (const key in this.body) {
      if (typeof this.body[key] !== "string") {
        this.body[key] = "";
      }
    }

    // Chama verify para obter os setores
    await this.verify();

    // Cria um novo objeto Date, representando a data e hora atuais
    var dataAtual = new Date();

    // Extrai o dia, mês e ano
    var dia = dataAtual.getDate();
    var mes = dataAtual.getMonth() + 1; // Os meses são indexados a partir de zero, então adicionamos 1
    var ano = dataAtual.getFullYear();

    // Formata a data para o formato "d/m/a"
    var dataFormatada = dia + "/" + mes + "/" + ano;

    this.body = {
      user: this.body.email,
      mensagem: this.body.message,
      diamesano: dataFormatada,
      setor: this.setoresbysort, // Usa os setores obtidos por verify.
      status: "Aberto",
    };
  }
}

module.exports = { RegistrarChamado };
