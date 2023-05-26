const express = require('express');
const contactRouter = express.Router();
const nodemailer = require('nodemailer');
const contactModel = require('../models/contactModel.js');
require('dotenv').config();

// Configuration du transporteur SMTP
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USERNAME,
        pass: process.env.GMAIL_PASSWORD,
    },
});

// Route pour la page de contact
contactRouter.get('/contact', async (req, res) => {
    try {
        let message = req.session.message;
        delete req.session.message;
        res.render('pages/home.twig', { message: message });
    } catch (error) {
        res.send(error);
    }
});


contactRouter.post('/contact', async (req, res) => {
    try {
        let newContact = new contactModel(req.body);
        newContact.validateSync();
        await newContact.save();

        // Envoyer un mail
        let mailOptions = {
            from: 'sebasti.thomass@gmail.com',
            to: 'sebasti.thomass@gmail.com',
            subject: 'Nouveau message - Portfolio',
            text: `Vous avez reçu un nouveau message de : ${req.body.name}.
            Email : ${req.body.email}
            Téléphone : ${req.body.phone}
            Sujet : ${req.body.subject}
            Message : ${req.body.message}`,
        };

        await transporter.sendMail(mailOptions);
        req.session.message = 'Votre message a bien été envoyé !';
        res.redirect('/contact#contact');

    } catch (error) {
        console.log(error);
        res.send(error);
    }
});

module.exports = contactRouter;