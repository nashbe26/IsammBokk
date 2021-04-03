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
const getConversationByUserId = async (conversationID)=>{
    return await conversation.find(conversationID)
}
async function sendMessage(data,message){
        console.log("sqdsqdqsd",message);
        console.log("data is here" ,data.message.message )
        data.message.message.push(message)
        return await conversation.findByIdAndUpdate("60651c9beacb9b357c2ba657",data.message,{
            new:true,setDefaultsOnInsert:true
        })
}
module.exports = {
    createConversation,
    deleteConversation,
    getAllConversation,
    getOneConversation,
    sendMessage,
    getConversationByUserId
};