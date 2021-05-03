const comments = require("../models/comments");
const Posts = require ("../models/post")
const Users = require ("../models/user")


const addComments = async(req,res)=>{
    const comment = req.body;
    await comments.create(comment).then(async (results)=>{
        await Users.findOneAndUpdate({_id:comment.userId}, {"$push": {"comments": results._id}},{new: true})
        res.status(200).json(results)
    }).catch(err =>{
        res.status(404)
        console.log(err)
    })
} 

const deleteComment = async (req,res) =>{
    const commentId = req.params.id;
    console.log(commentId);
    await comments.findByIdAndDelete(commentId).then(results=>{
        console.log("results",results);
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