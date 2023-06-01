const express = require('express');
const contactRouter = express.Router();
const contactModel = require('../models/contactModel.js');
const transporter = require('../services/mailer.js');

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
        req.session.mailMessage = 'Votre message a bien été envoyé !';
        res.redirect('/#contact');

    } catch (error) {
        console.log(error);
        res.send(error);
    }
});

module.exports = contactRouter;