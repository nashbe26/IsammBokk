const mongoose = require('mongoose');
const {Schema} = mongoose;

const newResponse= new Schema ({
    file:{
        type:String
    },
    description:{
        type:String
    },
    url:{
        type:String
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    homeworkId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Homework'
    }
},{timestamps:true})

const HomeworkRes = mongoose.model('HomeworkRes',newResponse);
module.exports=HomeworkRes