const express = require('express');
const router =express.Router();

const converastionController = require('../controllers/conversationController');

router.post("/createConversation",converastionController.newConversation);
router.post("/sendonversation",converastionController.sendMessage);
router.get("/getConversation/:id",converastionController.getConversation);
router.get("/getConversation",converastionController.getConversation);
router.post("/deleteConversation/:id",converastionController.deleteConversation)

module.exports = router;
