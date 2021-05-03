const mongoose = require('mongoose');
const {Schema} = mongoose;

const newConversation = new Schema({
    users:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }],
    message:[{
        content:{
            type:String
        },
        id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        }
    }]
})

const conversation = mongoose.model('conversation',newConversation)

module.exports = conversation;