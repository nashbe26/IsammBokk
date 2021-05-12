const express =require('express')
const router = express.Router();

const userFeedControllers = require('../controllers/feedUserController')

router.post('/addUserFeed',userFeedControllers.AddUserFeed);
router.delete('/deleteUserFeed/:id',userFeedControllers.deleteUserFeed);
router.get('/getUserFeed/:id',userFeedControllers.getUserFeed);

module.exports = router