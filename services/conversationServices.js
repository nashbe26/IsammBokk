const conversation = require("../models/conversation");


const createConversation = async (conversations)=>{
    return await conversation.create(conversations)
}
const deleteConversation = async (conversationID)=>{
    return await  conversation.findOneAndDelete(conversationID)
}
const getAllConversation = async ()=>{
     await conversation.find()
}
const getOneConversation = async (conversationID)=>{
    return await conversation.findById(conversationID)
}
async function sendMessage(data,message){
        console.log(message);
        data.message.content =message
}
module.exports = {
    createConversation,
    deleteConversation,
    getAllConversation,
    getOneConversation,
    sendMessage
};