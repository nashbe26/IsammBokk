const express =require('express')
const router = express.Router();

const userControllers = require('../controllers/userController')

router.get('/getAllUser',userControllers.getAll);
router.get('/dashboard/:id',userControllers.getUser);

module.exports = router