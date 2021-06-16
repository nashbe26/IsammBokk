const express = require('express');
const router =express.Router();

const homeworkController = require('../controllers/homeWorkController');

router.post('/addhomework',homeworkController.HomeworkCours)
router.get('/showhomework/:id',homeworkController.showHomework)
router.get('/showhomeworkById/:id',homeworkController.showOneHomeworkId)
router.get('/showhomeworkByAdmin/:id',homeworkController.showOneHomeworkAdmin)
router.delete('/deletehomework/:id',homeworkController.deleteHomework)
router.get('/checkuser/:id/:idHome',homeworkController.checkUser)

module.exports =router

