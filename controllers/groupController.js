const Group = require("../models/group");

const createGroup = async (req,res)=>{
    console.log(req.body);
    await Group.create(req.body).then(
        results=>{
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
        res.status(200).json(results)
    }).catch(err =>{
        res.status(404).json(err)
        console.log(err)
    })
}
const showOneGroup = async (req,res)=>{
    let id = req.params.id
 
    await Group.findById(id).populate( {path:'posts',
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
    console.log(groupId);
    await Group.find({userId:groupId}).then(results=>{
        res.status(200).json(results)
    }).catch(err =>{
        res.status(404).json(err)
        console.log(err)
    })

}
module.exports = {
    createGroup,
    groupComment,
    showOneGroup,
    showOneGroupId
}