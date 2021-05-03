const mongoose = require('mongoose');
const {Schema} = mongoose;
const bcrypt = require('bcrypt');
const {isEmail,isStrongPassword} = require ('validator');


const NewUser = new Schema({
    lastName:{
        type:String,
        require:[true,'You must chose your lastName']
    },
    firstName:{
        type:String,
        require:[true,'You must chose your firstName']
    },
    email:{
        type:String,
        unique:[true,'this email already exist'],
        required:[true,'You must write your email'],
        validate:[isEmail,'Please enter a valid email']
    },
    userType:{
        type:String,
        require:[true,'You must chose your type']
    },
    accountStatus:{
        type:String
    },
    registredDate:{
        type:Date
    },
    passowrd:{
        type:String,
        required:[true,'You must write your password'],
     
    },
    notifications:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'notifications'
    }],
    comments:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Comments'
    }],
    posts:[{type:mongoose.Schema.Types.ObjectId,
            ref:'Posts'}],
    conversation: [{
        type:mongoose.Schema.Types.ObjectId,
        ref:'conversation'
    }],
})

NewUser.pre('save',async function (req,res,next){
 
    const slat = await bcrypt.genSalt(10);
    this.passowrd = await bcrypt.hash(this.passowrd,slat);
   
    next();
})
NewUser.statics.login = async function(email,passowrd){
    const AllUsers =await  User.findOne({email:email});
    console.log(AllUsers)
    if (AllUsers){
        const AuthPassword = await bcrypt.compare(passowrd,AllUsers.passowrd)
        console.log(AuthPassword)
        if(AuthPassword){
            return(AllUsers);
        }throw Error('failed password');
    }throw Error('failed email');
}
const User = mongoose.model('User',NewUser);
module.exports  = User;