const express = require('express');
const router =express.Router();

const groupController = require('../controllers/groupController');

router.post('/addgroup',groupController.createGroup)
router.get('/showGroup/:id',groupController.showOneGroup)
router.get('/showGroupById/:id',groupController.showOneGroupId)
router.delete('/deleteGroup/:id',groupController.groupComment)
router.post('/addStudent',groupController.groupAdd)

module.exports =router