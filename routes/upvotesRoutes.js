const express = require('express');
const router =express.Router();

const upvotesController = require('../controllers/upvotesController');

router.post('/addupvote',upvotesController.addUpvotes)
router.get('/showupvote',upvotesController.showUpvotes)
router.get('/showOneupvote/:id',upvotesController.showUpvotesPost)
router.delete('/deleteupvote/:id',upvotesController.deleteUpvotes)

module.exports=router;