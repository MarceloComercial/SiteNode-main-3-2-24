require("dotenv").config(); //importa o .env com as chaves do banco de dados
const express = require("express");
const app = express();
const mongoose = require("mongoose"); //Biblioteca para tratar o MongoDB
mongoose
  .connect(process.env.CONNECTIONSTIG) //faz a conecção do banco de dados
  .then(() => {
    // se o banco entrar então
    console.log("Entrei no banco");
    app.emit("Logado");
  })
  .catch((e) => console.log(e)); // se der erro entao

const session = require("express-session"); // Salvar um Cookie
const MongoStore = require("connect-mongo"); // Salvar Cookie no Banco de dados
const flash = require("connect-flash"); // Mensagem auto destutiva
const routes = require("./routes"); //usa o arquivo de rotas
const path = require("path"); // Trabalhar com arquivos
const helmet = require("helmet"); // Recomendação do express
const csrf = require("csurf"); // Token de segurança
const crypto = require("crypto");
const {
  checkCsrfError,
  csrfMiddleware,
  middlewareGlobal,
} = require("./src/middlewares/middleware"); // middlweres permite passar funções nas rotas

app.use(helmet()); // Usar o helmet
app.use(express.urlencoded({ extended: true })); //tratar body do POST armazena oque vem do post em um obj
app.use(express.json()); // Usar json
app.use(express.static(path.resolve(__dirname, "public"))); //arquivos staticos que podem ser acessados .css .style em public

//config para cookies e session no MongoDB
const sessionOptions = session({
  secret: "oa+sdnj12310oasdaca",
  store: MongoStore.create({ mongoUrl: process.env.CONNECTIONSTIG }),
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 * 24 * 7, httpOnly: true },
});

app.use(sessionOptions);
app.use(flash());

app.use(csrf());
app.use(checkCsrfError); // Middlwares
app.use(csrfMiddleware); // Middlwares
app.use(middlewareGlobal); // Middlwares

// Parte responsavel por carregar o index.ejs o (ejs é um html que pode se usar algumas funções dentro dele mesmo)
app.set("views", path.resolve(__dirname, "src", "views"));
app.set("view engine", "ejs");



app.use(routes); //pede para o app usar o routes ^^

app.on("Logado", () => {
  app.listen(3000, () => {
    console.log("Aberto em http://localhost:3000");
  });
});
