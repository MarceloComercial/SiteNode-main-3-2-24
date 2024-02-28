const  UpdateChamado   = require("../model/UpdateChamadosModel");

exports.updateChamados = async function (req, res) {
    try {
        const userreg = new UpdateChamado(req.body);
        await userreg.update();

        if (userreg.erros.length > 0) {
            req.flash("erros", userreg.erros);
            req.session.save(function () {
                return res.redirect("/viewchamado");
            });
            return;
        }
        req.flash("success", 'Chamado Atualizado com Sucesso.');
        req.session.save(function () {
            return res.redirect("/viewchamado");
        });
    } catch (e) {
        console.log(e);
        return res.render("404");
    }
};