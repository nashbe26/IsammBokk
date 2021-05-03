const express = require('express');
const router =express.Router();

const notfiControllers = require('../controllers/notificationController')

router.get("/notification/:id",notfiControllers.getAllById)
router.delete("/deleteNotification/:id",notfiControllers.deleteNotification)

module.exports = router;