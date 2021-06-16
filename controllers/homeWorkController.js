const Homework = require("../models/homework");
const HomeworkRes = require("../models/responseHomework");
const User = require("../models/user");

const HomeworkCours = async (req,res)=>{
    console.log(req.body);
    await Homework.create(req.body).then(
        async results=>{
            User.findByIdAndUpdate(req.body.userId,{"$push":{"homework": results._id}},{new: true})
            User.find({ $and: [{ niveau: req.body.niveau }, { classRoom: req.body.classRoom }] }).then((data)=>{
               data.map(x=>{
                User.findByIdAndUpdate(x._id,{"$push":{"homework": results._id}},{new: true}).then(data =>{
                    console.log("dadadad",data.listhomework);

                })
                
               })
            })
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
 
    await Homework.findById(id).populate('Student').then(results=>{

        res.status(200).json(results)
    }).catch(err =>{
        console.log(err)
        res.status(404)
    })
}
const showOneHomeworkId = async (req,res)=>{
    const groupId = req.params.id;
    console.log(groupId,"groupId");
    await Homework.find({userId:groupId}).populate('userId').populate('Student').then(results=>{
        res.status(200).json(results)
    }).catch(err =>{
        res.status(404).json(err)
        console.log(err)
    })

}
const showOneHomeworkAdmin = async (req,res)=>{
    const groupId = req.params.id;
    console.log("here");
    await Homework.find({userId:groupId}).populate('userId').populate('Student').then(results=>{
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
    checkUser,
    showOneHomeworkAdmin
}