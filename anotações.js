const express = require('express');
const app  = express();

app.use(express.urlencoded({extended:true})); //tratar body do POST armazena oque vem do post em um obj


// Rota inicial 
app.get('/', (req,res) => {
    res.send('Hello World')
});

// O /: depois da roda significa que você vai passar um parametro 
// e se você colocar o ? depois do parametro significa que ele pode estar vazio ou nao 
// ou seja se você colocar /testes/:id? quer dizer que você vai entrar no /testes e pode passar o /:id?
// ou você pode passar uma query no url 
// Exemplo /testes/?nome=Luiz&idade=20
// o ? server para indicar o valor da query e o & server para passar uma nova query

app.get('/testes/:id?', (req,res) => { 
    console.log(req.params); // /id/3
    console.log(req.query); // /testes?nome=lucas&idade=20
    res.send(req.query.nome);
});

app.post('/', (req,res) => {
    //req.body.nome significa que ele esta pegando oque vem da req do formulario e puxando o atributo .nome do .body do formulario
    // name="nome" no form
    res.send(`Formulario ${req.body.nome}`);
});

app.listen(3000, () => {
    console.log('Aberto em http://localhost:3000')
});