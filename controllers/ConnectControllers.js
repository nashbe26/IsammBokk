const jwt = require('jsonwebtoken')
const User = require('../models/user');
const createToken = (id)=>{
    return jwt.sign({id},'Hey Mr Client',{expiresIn:"10000h"})
}
const ConnectController = async (req,res)=>{
    const handelEorror =()=>{
        const errors = {email:'',password:''}
        if(err.code = 11000){
            errors.email='This email is already Used'
            return errors
        }
        if (err.message == 'email incorrect'){
            errors.email = 'Please verify your email'
            return errors;
        }
        if(err.message=='password incorrect'){
            errors.password='please verify your password'
            return errors
        }
        if (err.message.includes('User Validation failed')){
            Object.values(err.errors).forEach(({properties})=>{
                errors[properties.path] = properties.message
            })
        }
    }
    const {email,passowrd} = req.body;
    const NewUser = new User ({email,passowrd})
    const create = await NewUser.save({email,passowrd})
    .then(()=>{
        res.send('hello world')
        
    })
    .catch(
        err => console.log(err)
    )
}
const CheckController = async (req,res)=>{
    try{

        const user = await User.login(req.body.email,req.body.passowrd);
        const jwtToken = createToken(user._id)
        res.cookie('x-access-token',jwtToken,{httpOnly:true,maxAge:77777});
        res.json({user,jwtToken});
        return user;
    }catch(err){
        console.log(err)
    }
   
}
module.exports ={ConnectController,CheckController};