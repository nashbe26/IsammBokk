const jwt = require('jsonwebtoken')
const User = require('../models/user');
const createToken = (id)=>{
    return jwt.sign({id},'Hey Mr Client',{expiresIn:"10000h"})
}
const handelEorror =(err)=>{
    const errors = {email:'',password:''}
    console.log(err.message,"dddddddddddd");
    
    if (err.message == 'failed password'){
        errors.password = 'Please verify your password'
        return errors;
    }
    if(err.message=='failed email'){
        errors.email='please verify your email'
        return errors
    }
    if(err.message.includes('User Validation failed')){
        Object.values(err.errors).forEach(({properties})=>{
            errors[properties.path] = properties.message
        })
    }
}
const ConnectController = async (req,res)=>{
    const create =await  User.create(req.body)
    .then((results)=>{
        res.status(200).json(results)
    })
    .catch(err =>{
        const failed = handelEorror(err)
        res.status(401).json(failed)
        })
    }
const CheckController = async (req,res)=>{
    try{
        const user = await User.login(req.body.email,req.body.passowrd);
        const jwtToken = createToken(user._id)
        res.cookie('x-access-token',jwtToken,{httpOnly:true,maxAge:77777});
        res.json({user,jwtToken});
       
    }catch(err){
        const failed = handelEorror(err)
        res.status(401).json(failed)
        
    }
   
}
module.exports ={ConnectController,CheckController};