const express = require('express');
const router = express.Router();

const ConnectController = require('../controllers/ConnectControllers');

router.post('/signup',ConnectController.ConnectController);
router.post('/login',ConnectController.CheckController);

module.exports  = router;