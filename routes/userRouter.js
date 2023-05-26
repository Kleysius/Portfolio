const express = require('express');
const userRouter = express.Router();
const bcrypt = require('bcrypt');

const userModel = require('../models/userModel.js');

// Route pour la page de connexion
userRouter.get('/login', async (req, res) => {
    try {
        let errors = req.session.error;
        delete req.session.error;
        res.render('pages/login.twig', { error: errors });
    } catch (error) {
        res.send(error);
    }
});

userRouter.post('/login', async (req, res) => {
    try {
        let errors = {};
        // Vérification de l'existence de l'utilisateur - req.body.email et req.body.password sont les données envoyées par le formulaire de connexion
        let user = await userModel.findOne({ email: req.body.email });
        if (user) {
            if (bcrypt.compareSync(req.body.password, user.password) === false) {
                errors.password = 'Mot de passe incorrect';
                // Si le mot de passe ne correspond pas, on redirige vers la page de connexion
                throw errors;
            } else {
                // Si le mot de passe correspond, on crée une session et on redirige vers le dashboard
                req.session.userId = user._id;
                res.redirect('/dashboard');
            }
        } else {
            errors.email = 'Email innexistant';
            throw errors;
        }
    } catch (error) {
        res.render('pages/login.twig', { error: error });
    }
});

module.exports = userRouter;