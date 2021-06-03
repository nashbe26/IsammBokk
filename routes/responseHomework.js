const express = require('express');
const router =express.Router();

const homeworkController = require('../controllers/responseHomework');

router.post('/addhomeworkresponse',homeworkController.HomeworkCours)
router.get('/showhomeworkByIdresponse/:id',homeworkController.showHomework)
router.get('/showhomeworkresponse/:id',homeworkController.showOneHomeworkId)
router.delete('/deletehomeworkresponse/:id',homeworkController.deleteHomework)

module.exports =router

