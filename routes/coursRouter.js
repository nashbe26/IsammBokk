const express = require('express');
const router =express.Router();

const coursController = require('../controllers/coursController');


router.post('/addCours',coursController.createCours)
router.get('/showCours/:id',coursController.showCours)
router.get('/showCoursById/:id',coursController.showOneCoursId)
router.delete('/deleteCours/:id',coursController.deleteCours)

module.exports =router

