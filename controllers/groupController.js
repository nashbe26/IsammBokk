const Group = require("../models/group");
const User = require("../models/user");
const user = require("../models/user");
const userServices = require("../services/userServices");

const createGroup = async (req,res)=>{
    console.log(req.body);
    await Group.create(req.body).then(
        async results=>{
            await User.findByIdAndUpdate(req.body.admin,{"$push": {"groupId": results._id} },{new: true}).then(data=>{
                console.log("data",data);
            }).catch(err => console.log(err))
            res.status(202).json(results)
        }).catch(err =>{
            res.status(404).json(err)
            console.log(err);
        })
}
const groupComment = async (req,res) =>{
    const groupId = req.params.id;
    console.log(groupId);
    await Group.findByIdAndDelete(groupId).then(results=>{
        console.log("sdsd",results);
        res.status(200).json(results)
    }).catch(err =>{
        res.status(404).json(err)
        console.log(err)
    })
}
const groupAdd = async (req,res)=>{
    console.log(req.body);
    await User.find({'$and':[
        { 'classRoom': req.body.filiere.toUpperCase() },
        { 'niveau': req.body.niveau },
    ]}).then( results=>{
        results.map(async x=>{
            await Group.findByIdAndUpdate( req.body.group,{"$push": {"userId": x._id} },{new: true}).then(data=>{
                console.log(data);
            }).catch(err => console.log(err))
            await User.findByIdAndUpdate(x._id,{"$push": {"groupId": req.body.group} },{new: true}).then(data=>{
                console.log(data);
            }).catch(err => console.log(err))
        })
        
        res.status(200).json(results)
    }).catch(err =>{
        res.status(404).json(err)
        console.log(err)
    })
}
const showOneGroup = async (req,res)=>{
    let id = req.params.id
    console.log("dsdsdsd");
    await Group.findById(id).populate({path:'posts',
    populate : {
      path : 'user'
    }}
).then(results=>{
        res.status(200).json(results)
    }).catch(err =>{
        console.log(err)
        res.status(404)
    })
}
const showOneGroupId = async (req,res)=>{
    const groupId = req.params.id;
    await User.findById(groupId).populate({path:'groupId',populate:{
        path:'admin'
    }}).then(results=>{
        res.json(results)
   
}).catch(err =>{
        res.status(404).json(err)
        console.log(err)
    })

}
module.exports = {
    createGroup,
    groupComment,
    showOneGroup,
    showOneGroupId,
    groupAdd
}