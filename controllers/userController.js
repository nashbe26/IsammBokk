const userService = require('../services/userServices')
const User = require('../models/user');
const getAll = async (req,res)=>{
    const getUsers = await User.find()
    .then( (data) =>{
        res.json(data)
    }).catch(err =>{
        console.log(err)
    })
}
const getUser = async (req,res)=>{
    id = req.params.id
    userService.getOneUser(id)
    .then( (data) =>{
        res.json(data)
    }).catch(err =>{
        console.log(err)
    })
}
module.exports={
    getAll,
    getUser
}