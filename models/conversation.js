const mongoose = require('mongoose');
const {Schema} = mongoose;

const newConversation = new Schema({
    idOwner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
    },
    idReceiver:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
    },
    message:{
        content:{type:String},
        id:{
            type:mongoose.Schema.Types.ObjectId
        }
        
    }
})

const conversation = mongoose.model('conversation',newConversation)

module.exports = conversation;