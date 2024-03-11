const mongoose = require('mongoose'); // Importa a biblioteca Mongoose, que facilita a interação com o MongoDB.


//// Connect Register
const RegisterSchemaChamado = new mongoose.Schema({ // Cria um esquema (Schema) para a coleção 'Register' no MongoDB.
    user  : {type:String }, // Define um campo 'email' do tipo String e obrigatório.
    mensagem : {type:String },  // Define um campo 'password' do tipo String e obrigatório.
    diamesano : {type:String },
    setor : {type:[String] },
    status : {type:String }
});
const RegisterModelChamado = mongoose.model('Chamado', RegisterSchemaChamado); // Cria um modelo (Model) chamado 'RegisterModel' para a coleção 'Register' usando o esquema 'RegisterSchema'.


const RespostaUsuarioSchema = new mongoose.Schema({
    chamadoId: { type: String, required: true }, // ID do chamado associado
    nomeUsuario: { type: String, required: true },
    emailUsuario: { type: String, required: true },// Nome do usuário que enviou a resposta
    mensagem: { type: String, required: true }, // Mensagem ou resposta enviada pelo usuário
    createdAt: { type: Date, default: Date.now } // Data e hora de criação da resposta
});

const RegisterModelRespostaChamado = mongoose.model('RespostaUsuario', RespostaUsuarioSchema);

//// Connect Grupo
const GrupoSchema = new mongoose.Schema({
    _id : String,
    Nome: String,
    Setores: [String],
});
const GrupoModel = mongoose.model('Grupo', GrupoSchema);

//// Connect Setores
const setoresSchema = new mongoose.Schema({
    cadastro_setor: String,
  });
const Setores = mongoose.model('setores', setoresSchema);
  
//// Connect Setores 
const RegisterSchema = new mongoose.Schema({ // Cria um esquema (Schema) para a coleção 'Register' no MongoDB.
    email  : {type:String , required: true}, // Define um campo 'email' do tipo String e obrigatório.
    password : {type:String , required: true},  // Define um campo 'password' do tipo String e obrigatório.
    setor : {type:[String] , required: true},
    admin : {type:String , require:true},
    nome : {type:String , require:true}
});
const RegisterModel = mongoose.model('Register', RegisterSchema); // Cria um modelo (Model) chamado 'RegisterModel' para a coleção 'Register' usando o esquema 'RegisterSchema'.

/// Connect Grupos
const RegisterGrupoSchema = new mongoose.Schema({ // Cria um esquema (Schema) para a coleção 'Register' no MongoDB.
    Nome  : {type:String , required: true}, // Define um campo 'email' do tipo String e obrigatório.
    Setores : {type:[String] , required: true}  // Define um campo 'password' do tipo String e obrigatório.
    
});
const RegisterGrupoModel = mongoose.model('Grupos', RegisterGrupoSchema); // Cria um modelo (Model) chamado 'RegisterModel' para a coleção 'Register' usando o esquema 'RegisterSchema'.
 


/// Connect Setores
const RegisterSetoresSchema = new mongoose.Schema({ // Cria um esquema (Schema) para a coleção 'Register' no MongoDB.
    cadastro_setor : {type:String , required: true}
});

const RegisterSetoresModel = mongoose.model('Setores', RegisterSetoresSchema); // Cria um modelo (Model) chamado 'RegisterModel' para a coleção 'Register' usando o esquema 'RegisterSchema'.


module.exports = { RegisterModelChamado , GrupoModel , Setores , RegisterModel , RegisterGrupoModel , RegisterSetoresModel , RegisterModelRespostaChamado};