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
})

const Link = mongoose.model('links',newLink);

module.exports = Link