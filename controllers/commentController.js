const comments = require("../models/comments");
const Posts = require ("../models/post")
const Users = require ("../models/user")
const Notfi = require('../models/notification');


const addComments = async(req,res)=>{
  
    
    const findUser = await Users.findById(req.body.userId)
    console.log(findUser);
    await comments.create(req.body).then(async (results)=>{
        let notifications = {
            idUser : findUser._id,
            notification:{
              context:"add a new comment"
            }
        }
        const notification = await Notfi.create(notifications).then(async notif =>{
            await Notfi.findById(notif._id).then( (newNotif) =>{
                console.log(newNotif);
                console.log(io);
                io.on('connection', function (socket) {
                    socket.broadcast.emit("notificationDetected",newNotif);
                }) 
            })
            await Users.findOneAndUpdate({_id:req.body.userId},{"$push":{"comments": results._id , "notifications":notif._id}},{new: true})
            await Posts.findOneAndUpdate({_id:req.body.postId},{"$push":{"comments": results._id}},{new: true}).then(data =>{
            })

        })
        res.status(200).json(results)
    })   
  

} 

const deleteComment = async (req,res) =>{
    const commentId = req.params.id;
    console.log(commentId);
    await comments.findByIdAndDelete(commentId).then(results=>{
       
        res.status(200).json(results)
    }).catch(err =>{
        res.status(404)
        console.log(err)
    })
}

const showComments = async (req,res) =>{
    const postId = req.params;
    console.log(postId.id);
    await comments.find({postId:postId.id}).sort({updated_at:-1}).populate('userId').then(results=>{
        res.status(200).json(results)
    }).catch(err =>{
        console.log(err)
        res.status(404)
   
    })
}
const showOneComments = async (req,res)=>{
    let id = req.params.id
    await comments.findById(id).populate('userId').then(results=>{
        res.status(200).json(results)
    }).catch(err =>{
        console.log(err)
        res.status(404)
    })
}
const updateComments = async (req,res)=>{
    const commentId = req.body;
    await comments.findOneAndUpdate({_id:commentId._id}, {"comment": commentId.content},{new: true})
}

module.exports = {
    addComments,
    deleteComment,
    showComments,
    updateComments,
    showOneComments
}