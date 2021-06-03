const mongoose = require('mongoose');
const {Schema} = mongoose;

const newCours = new Schema ({
    cours:{
        type:String
    },
    date:{
        type:String
    },
    hours:{
        type:String
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
},{timestamps:true})

const Cours = mongoose.model('Cours',newCours);
module.exports=Cours