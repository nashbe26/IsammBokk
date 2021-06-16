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
const getNameUser = async (req,res)=>{
    id = req.params.name
    if(id.length === 0)
    res.status(200).json({failed:'no User'})   
    await User.find({firstName:new RegExp(id, 'i') }).then((data)=>{
        res.status(200).json(data)
    }).catch(
        err =>res.status(404).json(err))
}
const getUserByclass = async (req,res)=>{
    console.log( "dsqdsqeee",req.body);
    User.find({ $and: [{ niveau: req.body.niveau }, { classRoom: req.body.classRoom }] }).then((data)=>{
      res.status(200).json(data)
     })
}

module.exports={
    getAll,
    getUser,
    getNameUser,
    getUserByclass

}