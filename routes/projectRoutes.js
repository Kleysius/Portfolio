const express = require('express');
const projectRouter = express.Router();
const upload = require('../services/multer.js');

const projectModel = require('../models/projectModel.js');
const authGuard = require('../services/authGuard.js');

// Route pour la page d'accueil
projectRouter.get('/', async (req, res) => {
    try {
        let projects = await projectModel.find();
        res.render('pages/home.twig', { projects: projects });
    } catch (error) {
        console.log(error);
    }
});

// Route pour qui affiche le dashboard après s'être connecté
projectRouter.get('/dashboard', authGuard, async (req, res) => {
    try {
        let projects = await projectModel.find();
        res.render('pages/adminDashboard.twig', { projects: projects });
    } catch (error) {
        console.log(error);
    }
});

// Route pour ajouter des projets
projectRouter.post('/addProject', upload.single('image'), (req, res) => {
    try {
        let newProject = new projectModel(req.body);
        newProject.image = req.file.filename;
        newProject.validateSync();
        newProject.save();
        res.redirect('/dashboard');
    } catch (error) {
        console.log(error);
        res.send(error);
    }
});

// Route pour modifier un projet
projectRouter.get('/updateProject/:id', upload.single('image'), async (req, res) => {
    try {
        let project = await projectModel.findById(req.params.id);
        res.render('pages/adminDashboard.twig', { project: project });
    } catch (error) {
        console.log(error);
    }
});


projectRouter.post('/updateProject/:id', upload.single('image'), async (req, res) => {
    try {
        await projectModel.updateOne({ _id: req.params.id }, req.body);
        res.redirect('/dashboard');
    } catch (error) {
        res.send(error);
    }
});

projectRouter.get('/deleteProject/:id', async (req, res) => {
    try {
        await projectModel.deleteOne({ _id: req.params.id });
        res.redirect('/dashboard');
    } catch (error) {
        res.send(error);
    }
});

module.exports = projectRouter;