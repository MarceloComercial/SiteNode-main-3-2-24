
exports.index = (req, res) => {
  if (req.session.user) {
    res.render("index" , {setorgrupo : res.locals.setores ,activePage: 'index' });
  } else {
    res.render("login");
  } // Renderiza a view "login" ao acessar a rota correspondente.
};
