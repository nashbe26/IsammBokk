const mongoose = require('mongoose');
const { Schema } = mongoose;
const postGroupSchema = new Schema({
    groupId:{
        type:mongoose.Schema.Types.ObjectId,ref:'group'
    },
    content:{
        type:String,
        required:true
    },
    src:{
        type:String
    },
    date:{
        type:Date
    },
    upvotes:[{
        type:mongoose.Schema.Types.ObjectId,ref:'upvotes'
    }],
    user:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
    comments:[{type:mongoose.Schema.Types.ObjectId,ref:'comments'}]
    
})
const Posts = mongoose.model('PostsGroup',postGroupSchema);
module.exports=Posts
