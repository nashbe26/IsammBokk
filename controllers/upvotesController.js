const upVotes = require ('../models/upvotes');
const Users = require ('../models/user');
const Notfi = require('../models/notification');
const Posts = require('../models/post');
const emmitter = require('../services/eventBus')
let newNotfi = {}
const addUpvotes = async (req,res)=>{
    const upvotess = req.body
   console.log(upvotess);
    const findUpvote = await upVotes.find({'$and': [
        { 'userId': req.body.userId },
        { 'postId': req.body.postId },

    ]})
    let notifications = {
        idOwner:upvotess.owner,
        idUser : req.body.userId,
        notification:{
          context:"liked your new post"
        }
    }
    console.log(findUpvote);
    if(findUpvote.length == 0){
        const upvote = await upVotes.create(upvotess).then(async (results)=>{
           
            const notification = await Notfi.create(notifications).then(async data=>{
                 newNotfi = await await Notfi.findById(data._id).populate('idUser')
                await Users.findOneAndUpdate({_id:upvotess.userId},{"$push":{"upvotes": results._id,"notifications":data._id}} ,{new: true})
            })

            await Posts.findOneAndUpdate({_id:upvotess.postId},{"$push":{"upvotes": results._id}},{new: true})
            emmitter.emit("newNotifvote",newNotfi);
          

            res.status(200).json({value:'true'})
        }).catch(err =>{
            console.log(err);
            res.status(404).json(err)
        })   
    }else{
        const resultss = await upVotes.findByIdAndDelete(findUpvote[0]._id).then(check =>{
            res.status(200).json({value:'false'})
        })
    }
}
const showUpvotes = async (req,res)=>{
    
    await upVotes.find({userId:req.body.userId}).sort({updated_at:-1}).populate('userId').then(results=>{
        res.status(200).json(results)
    }).catch(err =>{
        console.log(err)
        res.status(404)
   
    })
}
const showUpvotesPost = async (req,res)=>{
    id=req.params.id
    await upVotes.find({postId:id}).sort({updated_at:-1}).populate('userId').then(results=>{
        res.status(200).json(results)
    }).catch(err =>{
        console.log(err)
        res.status(404)
   
    })
}
const deleteUpvotes = async (req,res)=>{
    const upvotes = req.body;
    console.log(commentId);
    await upVotes.findByIdAndDelete(upvotes.id).then(results=>{
        res.status(200).json(results)
    }).catch(err =>{
        res.status(404)
        console.log(err)
    })
}

module.exports = {
    addUpvotes,
    showUpvotes,
    showUpvotesPost,
    deleteUpvotes
}