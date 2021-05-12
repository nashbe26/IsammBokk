const mongoose = require('mongoose');
const {Schema} = mongoose;

const newNotification = new Schema ({
    idUser:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
 
    notification:[{
        context:{
            type:String
        }
    }]
   
},{timestamps:true})
const notification = mongoose.model('notifications',newNotification);

module.exports = notification