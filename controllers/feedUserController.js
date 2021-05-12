const Users = require ('../models/user');
const Posts = require('../models/post');
const userFeed = require('../models/userFeed');

const AddUserFeed = async(req,res)=>{
    console.log("resiltsssssssssssssssssssssssss", req.body);
    const feedUser = await userFeed.create(req.body).then(async feed =>{
        console.log("resilts", feed);
        await userFeed.findOneAndUpdate({_id:feed._id}, { "$push": {"userFeed": req.body.postId}},{new: true})
        await Users.findOneAndUpdate({_id:req.body.userId}, { "$push": {"userFeed": req.body.postId}},{new: true}).
        then(ressults =>{
            console.log("ressultsressultsressultsressultsressultsressultsressultsressults");
        })
        .catch(err =>{
            console.log(err);
        });
    })

    res.status(200)
}

const deleteUserFeed = async(req,res)=>{
    const id = req.params.id
    await Users.findOneAndDelete({_id:id});
}

const getUserFeed = async(req,res)=>{
    const id = req.params.id
    const feedUser = await userFeed.find({userId:id}).populate( {path:'userFeed',
    populate : {
      path : 'user'
    }}).populate('userId')
    res.status(200).json(feedUser)
}

module.exports = {
    AddUserFeed,
    deleteUserFeed,
    getUserFeed
}