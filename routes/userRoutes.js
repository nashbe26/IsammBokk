const express =require('express')
const router = express.Router();

const userControllers = require('../controllers/userController')

router.get('/getAllUser',userControllers.getAll);

module.exports = router