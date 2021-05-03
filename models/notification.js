const mongoose = require('mongoose');
const {Schema} = mongoose;

const newNotification = new Schema ({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
    },
    notification:[{
        context:{
            type:String
        }
    }]
   
})
const notification = mongoose.model('notifications',newNotification);

module.exports = notification