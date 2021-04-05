const mongoose = require('mongoose');
const {Schema} = mongoose;

const newConversation = new Schema({
    users:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
    }],
    message:[{
        content:{
            type:String
        }
    }]
})

const conversation = mongoose.model('conversation',newConversation)

module.exports = conversation;