const mongoose = require('mongoose');
const {Schema} = mongoose;

const newCours = new Schema ({
    NameHomework:{
        type:String
    },
    matiere:{
        type:String
    },
    description:{
        type:String
    },
    niveau:{
        type:String
    },  
    classRoom:{
        type:String
    },
    date:{
        type:String
    },
    hours:{
        type:String
    },
    Student:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }],
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    responseHome:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'HomeworkRes'
    }]
},{timestamps:true})

const Homework = mongoose.model('Homework',newCours);
module.exports=Homework