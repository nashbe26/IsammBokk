const mongoose = require('mongoose');
const {Schema} = mongoose;
const bcrypt = require('bcrypt');
const {isEmail,isStrongPassword} = require ('validator');

const NewUser = new Schema({
    lastName:{
        type:String
    },
    firstName:{
        type:String
    },
    email:{
        type:String,
        index: {unique: true, dropDups: true}
    },
    userType:{
        type:String,
    },
    accountStatus:{
        type:String
    },
    registredDate:{
        type:Date
    },
    password:{
        type:String,
    },
    confirmPassword:{
        type:String,
    },
    classRoom:{
        type:String,
    },
    upvotes:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'upvotes'
    }],
    notifications:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'notifications'
    }],
    comments:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Comments'
    }],
    posts:[{type:mongoose.Schema.Types.ObjectId,
            ref:'Posts'
    }],
    conversation: [{
        type:mongoose.Schema.Types.ObjectId,
        ref:'conversation'
    }],
    upvotes:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'upvotes'
        
    }],
    userFeed:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Posts'
    }],
    homework:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Homework'
    }],
    listhomework:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Homework'
    }],
    

})

NewUser.pre('save',async function (req,res,next){
 
    const slat = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,slat);
   
    next();
})
// NewUser.path('email').validate(async(email)=>{
//     const emailCount = await mongoose.models.email.countDocuments({email});
//     return !emailCount;
// },'Email already exists')
NewUser.statics.login = async function(email,password){
    const AllUsers =await  User.findOne({email:email});
    console.log("dqsdsqd",AllUsers)
    if (AllUsers !=null){
        const AuthPassword = await bcrypt.compare(password,AllUsers.password)
        console.log(AuthPassword)
        if(AuthPassword){
            return(AllUsers);
        }throw Error('failed password');
    }throw Error('failed email');
}
const User = mongoose.model('User',NewUser);
module.exports  = User;