
  exports.index = (req, res, next) => {
    
  
    res.render("grupos" ,{ activePage: 'grupos' });
  
    
    next();
  };