const express = require('express');
const router =express.Router();

const addPsotController = require('../controllers/addPostController');

router.post('/addPost',addPsotController.addPost)
router.get('/showPost',addPsotController.retPsot)
router.get('/showPost/:id',addPsotController.showPostById)
router.delete('/deletePost/:id',addPsotController.deletePost)

module.exports=router;