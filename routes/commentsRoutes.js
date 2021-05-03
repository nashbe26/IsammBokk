const express = require('express');
const router = express.Router();

const commentController = require('../controllers/commentController');

router.post('/sendcomment',commentController.addComments)
router.delete('/deletecomment/:id',commentController.deleteComment)
router.get('/getcomments/:id',commentController.showComments)
router.get('/getonecomments/:id',commentController.showOneComments)
router.post('/updatecomment',commentController.updateComments)

module.exports = router;