const mongoose = require('mongoose');
const {Schema} = mongoose;

const newLink = new Schema({
    id:{
        type:String
    },
    date:{
        type:Date
    },
    gid:{
        type:String
    },
    url:{
        type:String
    },
    cours:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Cours'
    }
})

const Link = mongoose.model('links',newLink);

module.exports = Link