const express = require('express');
const router =express.Router();

const addPsotController = require('../controllers/addPostController');

router.post('/addPost',addPsotController.addPost)
// router.get('/addPost',function(req,res){
//     res.render('add')
// })
router.get('/showPost',addPsotController.retPsot)
router.get('/showPost/:id',addPsotController.showPostById)

module.exports=router;