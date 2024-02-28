const UpdateUser  = require("../model/UpdateUsersModel");

exports.updateUser = async function (req, res) {
    try {
        const userreg = new UpdateUser(req.body);
        await userreg.update();

        if (userreg.erros.length > 0) {
            req.flash("erros", userreg.erros);
            req.session.save(function () {
                return res.redirect("/editusers");
            });
            return;
        }
        req.flash("success", 'Usuario Atualizado com Sucesso.');
        req.session.save(function () {
            return res.redirect("/editusers");
        });
    } catch (e) {
        console.log(e);
        return res.render("404");
    }
};