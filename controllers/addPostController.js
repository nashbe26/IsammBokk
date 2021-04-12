const Posts = require('../models/post');
const Users = require('../models/user');

const socket = require('socket.io');

const jwt  = require ('jsonwebtoken');



const addPost =  async (req,res)=>{
    let io = req.app.get('socketio');
    console.log(req.cookies['token'])
    let userId = req.cookies['token'] && req.cookies['token']
    const posts = {
        title:req.body.title,
        content:req.body.content,
        user:userId
    }
    var notif=[];
    const findUser = await Users.findById(userId)
    console.log(findUser.posts)
    const addPost = await Posts.create(posts)
    .then(async (resu)=>{
    if(resu){
        let newNotfication ={title:resu.title,
            content:resu.content,
         user:findUser._id}
        
            io.emit('detect',{
                notif:[...notif,newNotfication]
        })
        
    }
       
        findUser.posts.push(resu._id)
        const addUser = await Users.create(findUser)
        res.render('index')
    } 
    )
    .catch((err)=>{
        console.log(err)
    })
}
const showPostById = async (req,res)=>{
    const {id} = req.params
    console.log(id)
    const retreivePostById = await Posts.findById(id).populate({ path:'user' , model: Users })
    res.send(retreivePostById);
 
}
const retPsot= async (req,res)=>{
    const retreivePost = await Posts.find()
    .then((resu)=>{
        res.send(resu)
    }).catch(err=>{
        console.log(err);
    })  
}

module.exports={
    addPost,
    showPostById,
    retPsot
}