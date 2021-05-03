const Posts = require('../models/post');
const Users = require('../models/user');
const Group = require('../models/group');

const socket = require('socket.io');

const jwt  = require ('jsonwebtoken');

const addPost =  async (req,res)=>{
    console.log(req.body);
    const findUser = await Users.findById(req.body.user)
    const findGroup = await Group.findById(req.body.groupId)
    const postUser = await Posts.create(req.body)
    .then(async (resu)=>{
    await Users.findOneAndUpdate({_id:findUser._id},{"$push": {"posts":resu._id} },{new: true})
        
    await  Group.findOneAndUpdate({_id:findGroup._id},{"$push": {"posts":resu._id} },{new: true})    
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
    const {id} = req.params
    console.log(id)
     await Posts.findById(id).populate({ path:'user' , model: Users }).then(
        results=>{
            console.log("dqsdsqd",results);
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