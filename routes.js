const express = require('express');
const route = express.Router();


const homeController = require('./src/controllers/homeController'); // recupera as paginas na pasta homeController
const loginController = require('./src/controllers/loginController'); // recupera as paginas na pasta loginController
const conteudosController = require('./src/controllers/pagsconteudos'); // recupera as paginas na pasta loginController
const sendchamado = require('./src/controllers/sendchamado'); // recupera as paginas na pasta loginController
const grupos = require('./src/controllers/editgruposController');
const registrarsetor = require('./src/controllers/registrarsetorController');
const registergroupsController = require('./src/controllers/registergroupController');
const dashboard = require('./src/controllers/dashboardController');
const chamadoController = require('./src/controllers/chamadoController');
const updateGrupoController = require('./src/controllers/updategrupoController');
const removeGrupoController = require('./src/controllers/removegroupController');
const createuserController = require('./src/controllers/createuserController');
const editusercontroller = require('./src/controllers/editusersController');
const updateUsers = require('./src/controllers/updateusersController');
const removeUsers = require('./src/controllers/removeusersController');
const viewchamadocontroller = require('./src/controllers/viewchamadoController');
const meuschamados = require('./src/controllers/meuschamados');
const atualizarChamado = require('./src/controllers/updatechamadosController')
const ObterRespostasChamados = require('./src/controllers/ObterRespostasChamados')

//Rotas Home
route.get('/', homeController.index  ); // Cria uma rota importando de homeController a pagina inicial criada la

// Rota login
route.get('/login', loginController.index)
route.post('/entrar', loginController.entrar)



route.get('/registersetor.admin', registrarsetor.index)
route.post('/registersetor.register', registrarsetor.register)


// Rota login
route.get('/logout', loginController.logout)
route.get('/conteudo/:pagina', conteudosController.index)

//Rota DashBoard
route.get('/dashboard', dashboard.index)

//Rota NovoChamado 
route.get('/chamado', chamadoController.index)


//Rota Chamado
route.post('/sendchamado', sendchamado.msgsend)

//Rota Grupo
route.get('/editgrupos', grupos.index)
route.post('/editgrupos', updateGrupoController.updateGroup);


//rota modal grupo 
route.post('/registergroup' , registergroupsController.register)
route.post('/removegroup' , removeGrupoController.remove)
 

//Rota User 
route.post('/createuser' , createuserController.register)
route.get('/editusers' , editusercontroller.index)
route.post('/updateUser' , updateUsers.updateUser)
route.post('/removeUser' , removeUsers.remove)


//Rota chamado
route.get('/meuschamados', viewchamadocontroller.index)
route.get('/viewchamado', meuschamados.index)

route.post('/atualizarchamado' ,  atualizarChamado.updateChamados)

route.get('/recuperar-respostas' ,  ObterRespostasChamados.recuperarRespostas)


module.exports = route; // exporta o route para usar