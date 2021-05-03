const mongoose = require('mongoose');
const {Schema} = mongoose;

const newComment = new Schema({
    postId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Posts'
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    commentContent:{
        type:String,
    },
    dateComment:{
        type:Date
    }
});

const Comment = mongoose.model('comments',newComment)

module.exports = Comment;