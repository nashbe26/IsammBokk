const Posts = require('../models/post');
const Users = require('../models/user');
const Notfi = require('../models/notification');
const express = require('express');



const addPost =  async (req,res)=>{
    var io = req.app.get('socketio');
    const findUser = await Users.findById(req.body.user)
    const postUser = await Posts.create(req.body)
    .then(async (resu)=>{
        let notifications = {
            idUser:findUser._id,
            notification:{
              context:"add a new post"
            }
          }
          const findPost = await Posts.findById(resu._id).populate('user')
          await Users.findOneAndUpdate({_id:findUser._id},{"$push": {"posts":resu._id}},{new: true});
          await Notfi.create(notifications).then(async (Convnotification)=>{
            const findNoti =await  Notfi.findById(Convnotification._id).populate('idUser');
            await Users.find({_id : {$nin:resu._id}}).then(
                async (allUser) =>{
                    allUser.map(async x=>{
                        await Users.findOneAndUpdate({_id:x._id},{"$push": {"notifications":Convnotification._id}},{new: true});
                    })
            })
            io.emit( "notificationDetected",findNoti);
        })    
        res.status(200).json(findPost);
    })
    .catch((err)=>{
        console.log(err)
    })

   
}

const deletePost = async (req,res) =>{
    const postId = req.params.id;

    await Posts.findByIdAndDelete(postId).then(results=>{
        console.log("results",results);
        res.status(200).json(results);
    }).catch(err =>{
        res.status(404);
        console.log(err);
    })
}

const showPostById = async (req,res)=>{
    let id = req.params.id
     await Posts.findById(id).populate({ path:'user' , model: Users }).then(
        results=>{
            res.json(results);
        })
}

const retPsot= async (req,res)=>{
    await Posts.find().sort({date:-1}).populate('user').populate('upvotes')
    .then((resu)=>{
        res.json(resu);
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
