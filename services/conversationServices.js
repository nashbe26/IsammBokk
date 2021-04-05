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
const findOneConversation = async(conversations)=>{
    return await conversation.find({$and:[{idOwner:conversations.idOwner},{idReceiver:conversations.idReceiver}]})
}
const getOneConversation = async (conversationID)=>{
    return await conversation.findById(conversationID)
}
const getConversationByUserId = async (conversationID)=>{
    return await conversation.find(conversationID)
}
async function sendMessage(getOne,received){
    getOne.message.push(received.message)
    return await conversation.findByIdAndUpdate("6069b312dfb9be2bb4e87b4d",getOne,{
        new:true,
    }).then(res =>{
        console.log ("dsqdsqd",res)
    }).catch (err =>{
        console.log(err);
    })
}
module.exports = {
    createConversation,
    deleteConversation,
    getAllConversation,
    getOneConversation,
    sendMessage,
    getConversationByUserId,
    findOneConversation
};