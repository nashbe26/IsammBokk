const conversation = require("../models/conversation");
let newUsers = [];

const createConversation = async (users)=>{
    return await conversation.create(users)
}
const findOneConversationById = async (user) =>{
   
     return await conversation.find( { $or: [ {users : user.users},{users : user.users.reverse()} ] })
}
const deleteConversation = async (conversationID)=>{
    return await  conversation.findOneAndDelete(conversationID)
}
const getAllConversation = async ()=>{
     return await conversation.find()
}
const findOneConversation = async(conversations)=>{
    newUsers=conversations.split(',')
    return await conversation.find({users:newUsers},{users:newUsers.reverse()})
}

const getOneConversation = async (conversationID)=>{
  
    return await conversation.findById(conversationID)
}
const getConversationByUserId = async (conversationID)=>{

    return await conversation.find(conversationID)
}
async function sendMessage(received){
    console.log("****************************************",received);
    return await conversation.findOneAndUpdate({_id:received._id},{"$push": {"message": received.message} },{new: true})
}
module.exports = {
    createConversation,
    deleteConversation,
    getAllConversation,
    getOneConversation,
    findOneConversationById,
    sendMessage,
    getConversationByUserId,
    findOneConversation
};