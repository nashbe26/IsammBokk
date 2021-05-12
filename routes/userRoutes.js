const express =require('express')
const router = express.Router();

const userControllers = require('../controllers/userController')

router.get('/getAllUser',userControllers.getAll);
router.get('/dashboard/:id',userControllers.getUser);
router.get('/searchbyname/:name',userControllers.getNameUser);


module.exports = router