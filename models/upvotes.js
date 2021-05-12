const mongoose = require('mongoose');
const {Schema} = mongoose;

const newUpvotes = new Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    postId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'posts'
    },
    createdAt:{
        type:Date
    }
})

const upVotes = mongoose.model('upvotes',newUpvotes);

module.exports = upVotes