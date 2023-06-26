const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const crypto = require('crypto');
const projectRouter = require('./routes/projectRoutes');
const userRouter = require('./routes/userRouter');
const contactRouter = require('./routes/contactRoutes');
const cors = require('cors');


require('dotenv').config();

const app = express();

app.use(cors({
    origin: 'https://kleysius.github.io',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Fonction pour générer la clé secrète
const generateSecretKey = () => {
    return crypto.randomBytes(32).toString('hex');
};

// Configuration de la session avec la clé secrète générée
app.use(session({
    secret: generateSecretKey(),
    resave: false, // Cette option permet de sauvegarder une session même si elle n'a pas été modifiée
    saveUninitialized: false // Cette option contrôle si une session non initialisée (c'est-à-dire une session qui n'a pas été modifiée) doit être enregistrée dans le store de session. Si false, elle ne sera pas enregistrée dans le store de session, mais une session sera quand même créée. La valeur recommandée est false.
}));

app.use(function (req, res, next) { //récupère la cession utilisateur si connecté sur toutes les pages
    res.locals.session = req.session
    next()
})

app.use(projectRouter);
app.use(userRouter);
app.use(contactRouter);

app.listen(process.env.PORT, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log(`Server started on port ${process.env.PORT}`);
    }
});

try {
    mongoose.connect(process.env.BDD_MDB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    console.log('Connected to database');
} catch (error) {
    console.log(error);
}