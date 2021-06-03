const Homework = require("../models/homework");
const HomeworkRes = require("../models/responseHomework");
const User = require("../models/user");

const HomeworkCours = async (req,res)=>{
    await Homework.create(req.body).then(
        async results=>{
            console.log(results);
            User.findByIdAndUpdate(req.body.userId,{"$push":{"listhomework": results._id}},{new: true})
            User.findByIdAndUpdate(req.body.student,{"$push":{"homework": results._id}},{new: true})
            res.status(202).json(results)
        }).catch(err =>{
            res.status(404).json(err)
            console.log(err);
    })
}
const deleteHomework = async (req,res) =>{
    const groupId = req.params.id;
    await Homework.findByIdAndDelete(groupId).then(results=>{
        res.status(200).json(results)
    }).catch(err =>{
        res.status(404).json(err)
        console.log(err)
    })
}
const  showHomework = async (req,res)=>{
    let id = req.params.id
 
    await Homework.findById(id).then(results=>{

        res.status(200).json(results)
    }).catch(err =>{
        console.log(err)
        res.status(404)
    })
}
const showOneHomeworkId = async (req,res)=>{
    const groupId = req.params.id;
    console.log("here");
    await Homework.find({userId:groupId}).populate('userId').then(results=>{
        res.status(200).json(results)
    }).catch(err =>{
        res.status(404).json(err)
        console.log(err)
    })

}
const checkUser = async (req,res)=>{
    const groupId = req.params.id;
    const home = req.params.idHome;

    await Homework.findById(home).then(async data =>{
        await HomeworkRes.find({userId:groupId,homeworkId:data._id}).then(results=>{
            console.log(results);
            res.status(200).json(results)
        }).catch(err =>{
            res.status(404).json(err)
            console.log(err)
        })
    })
}
module.exports = {
    HomeworkCours,
    deleteHomework,
    showHomework,
    showOneHomeworkId,
    checkUser
}