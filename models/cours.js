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
    },
    sessionStatus:{
        type:String
    },etat:{
        type:String,
        default:"pending"
    },
    lien:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'links'
    }
},{timestamps:true})

const Cours = mongoose.model('Cours',newCours);
module.exports=Cours