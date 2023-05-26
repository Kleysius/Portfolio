const userModel = require('../models/userModel');

// Middleware qui vérifie si l'utilisateur est connecté
const authGuard = async (req, res, next) => {
    let user = await userModel.findById(req.session.userId);
    if (user) {
        next();
    } else {
        res.redirect('/login');
    }
}

module.exports = authGuard;