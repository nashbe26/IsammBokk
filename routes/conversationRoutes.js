const express = require('express');
const router =express.Router();

const converastionController = require('../controllers/conversationController');

router.post("/createConversation",converastionController.newConversation);
router.post("/sendConversation",converastionController.sendMessage);
router.get("/getOneConversation/:id",converastionController.getOneConversation);
router.get("/getOneConversationPopUp/:id",converastionController.getOneConversationPopUp);
router.get("/getAllConversation",converastionController.getConversation);
router.post("/deleteConversation/:id",converastionController.deleteConversation)

module.exports = router;
