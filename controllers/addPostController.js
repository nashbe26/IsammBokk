const Posts = require('../models/post');
const Users = require('../models/user');
const Notfi = require('../models/notification');
const express = require('express');

const socket = require('socket.io');

const jwt  = require ('jsonwebtoken');

app = express();



const addPost =  async (req,res)=>{
    const findUser = await Users.findById(req.body.user)
    const postUser = await Posts.create(req.body)
    .then(async (resu)=>{
        let notifications = {
            user : findUser._id,
            notification:{
              context:"add  a new post"
            }
          }
        const notification = await Notfi.create(notifications)
        await Users.find({_id : {$nin:resu._id}}).then(
        async (allUser) =>{
            allUser.map(async x=>{
                await Users.findOneAndUpdate({_id:x._id},{"$push": {"notifications":notification._id}},{new: true})
            })
        }
    )
        io.on('connection', function (socket) {
            socket.broadcast.emit("notificationDetected",notification);
    })              
    await Users.findOneAndUpdate({_id:findUser._id},{"$push": {"posts":resu._id}},{new: true}).then(
        results =>{
            console.log("results",results);
            }).catch(err =>{
            console.log(err);
        })
        res.json(resu)
    })
    .catch((err)=>{
        console.log(err)
    })

   
}
const deletePost = async (req,res) =>{
    const postId = req.params.id;

    await Posts.findByIdAndDelete(postId).then(results=>{
        console.log("results",results);
        res.status(200).json(results)
    }).catch(err =>{
        res.status(404)
        console.log(err)
    })
}

const showPostById = async (req,res)=>{

     await Posts.findById(id).populate({ path:'user' , model: Users }).then(
        results=>{
            res.json(results)
        })
}
const retPsot= async (req,res)=>{
    await Posts.find().sort({date:-1}).populate('user')
    .then((resu)=>{
        res.json(resu)
    }).catch(err=>{
        console.log(err);
    })  
}

module.exports={
    addPost,
    showPostById,
    retPsot,
    deletePost
}