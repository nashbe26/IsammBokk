const mongoose = require('mongoose');
const {Schema} = mongoose;

const newGroup= new Schema({

    userId:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }],
   admin:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User'
   },
   nomGroup:{
       type:String
   },
   posts:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Posts'
    }],
    createdDate:{
        type:Date
    }
},{timestamps:true});

const Group = mongoose.model('group',newGroup)

module.exports = Group;