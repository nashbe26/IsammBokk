const express = require('express');
const router =express.Router();

const addGroupController = require('../controllers/postsGroupController');

router.post('/addPostGroup',addGroupController.addPost)
router.get('/showPostGroup',addGroupController.retPsot)
router.get('/showPostGroup/:id',addGroupController.showPostById)
router.delete('/deletePostGroup/:id',addGroupController.deletePost)

module.exports=router;