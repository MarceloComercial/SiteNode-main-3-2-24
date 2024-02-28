exports.index = (req, res, next) => {
  res.render("dashboard" , { activePage: 'dashboard' });
  next();
};

