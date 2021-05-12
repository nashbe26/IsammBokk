const mongoose = require('mongoose');
const {Schema} = mongoose;

const userFeed = new Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
        
    },
    userFeed:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Posts'
    }],
    timeDate:{
        type:Date,
        default:Date.now()
    }
})

const Feed = mongoose.model('userFeed',userFeed);

module.exports  = Feed;