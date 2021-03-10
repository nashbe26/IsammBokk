const mongoose = require('mongoose');
const {Schema} = mongoose;
const bcrypt = require('bcrypt');
const {isEmail,isStrongPassword} = require ('validator');


const NewUser = new Schema({
    email:{
        type:String,
        unique:true,
        required:[true,'You must write your email'],
        validate:[isEmail,'Please enter a valid email']
    },
    passowrd:{
        type:String,
        required:[true,'You must write your password'],
     
    },
    posts:[{type:mongoose.Schema.Types.ObjectId,ref:'posts'}]

})

NewUser.pre('save',async function (req,res,next){
    console.log(this.passowrd );
    const slat = await bcrypt.genSalt(10);
    this.passowrd = await bcrypt.hash(this.passowrd,slat);
    console.log(this.passowrd );
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