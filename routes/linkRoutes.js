const express = require('express');
const router =express.Router();

const linkControllers = require('../controllers/linkController')

router.post('/link',linkControllers.addLink)
router.get('/link/:id',linkControllers.showLink)

module.exports = router