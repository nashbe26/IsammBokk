const express = require('express');
const router = express.Router();

const backofficeController = require('../controllers/backOfficeController');

// router.post('/sendcomment',backofficeController.addComments)
router.delete('/deletecomment/:id',backofficeController.deleteUser)
router.get('/approuveUser/:id',backofficeController.approveUser)
router.get('/approuveCours/:id',backofficeController.approveCours)
router.get('/getAllCours',backofficeController.showCours)
// router.post('/updatecomment',backofficeController.updateComments)

module.exports = router;