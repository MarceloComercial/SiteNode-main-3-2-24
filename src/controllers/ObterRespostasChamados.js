const { RegisterModelRespostaChamado }= require("../model/Connections/connects");

exports.recuperarRespostas = async function (req, res) {
  try {
    // Recupere o ID do chamado da query da URL
    const chamadoId = req.query.id;
    
    // Consulte a coleção de respostas de usuários para encontrar as respostas associadas ao chamado
    const respostas = await RegisterModelRespostaChamado.find({ chamadoId: chamadoId });
    
    // Envie as respostas de volta como resposta para o cliente
    res.json(respostas);
  } catch (error) {
    console.error('Erro ao recuperar as respostas:', error);
    // Renderize a view "404" em caso de erro
    return res.render("404");
  }
};