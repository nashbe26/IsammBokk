const conversation = require("../models/conversation");


const createConversation = async (conversations)=>{
    return await conversation.create(conversations)
}
const deleteConversation = async (conversationID)=>{
    return await  conversation.findOneAndDelete(conversationID)
}
const getAllConversation = async ()=>{
     await conversation.find(conversationID)
}
const getOneConversation = async (conversationID)=>{
    return await conversation.findById(conversationID)
}
const updateConversation = async (conversations)=>{
     getOneConversation(conversationID).then(
         results =>{
             results.message.push(conversations.message)
         }).catch(err =>{
             console.log(err)
         })
}
module.exports = {
    createConversation,
    deleteConversation,
    getAllConversation,
    getOneConversation,
    updateConversation
};