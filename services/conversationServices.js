const conversation = require("../models/conversation");

 
const createConversation = async (conversations)=>{
    return await conversation.create(conversations)
}
const deleteConversation = async (conversationID)=>{
    return await  conversation.findOneAndDelete(conversationID)
}
const getAllConversation = async ()=>{
    return await conversation.find()
}
const getOneConversation = async (conversationID)=>{
    return await conversation.findById(conversationID)
}
module.exports = {
    createConversation,
    deleteConversation,
    getAllConversation,
    getOneConversation
};