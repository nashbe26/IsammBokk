const HomeworkRes = require("../models/responseHomework");
const Homework= require("../models/homework");

const HomeworkCours = async (req,res)=>{
    await HomeworkRes.create(req.body).then(
        async results=>{
            await Homework.findByIdAndUpdate({_id:results.homeworkId},{"$push":{"responseHome": results._id}},{new: true})
            res.status(202).json(results)
        }).catch(err =>{
            res.status(404).json(err)
            console.log(err);
        })
}
const deleteHomework = async (req,res) =>{
    const groupId = req.params.id;
    await HomeworkRes.findByIdAndDelete(groupId).then(results=>{
        res.status(200).json(results)
    }).catch(err =>{
        res.status(404).json(err)
        console.log(err)
    })
}
const showHomework = async (req,res)=>{
    let id = req.params.id
    await HomeworkRes.findById(id).then(results=>{
        console.log(results);
        res.status(200).json(results)
    }).catch(err =>{
        console.log(err)
        res.status(404)
    })
}
const showOneHomeworkId = async (req,res)=>{
    const groupId = req.params.id;
    await HomeworkRes.find({homeworkId:groupId}).populate('userId').then(results=>{
        res.status(200).json(results)
    }).catch(err =>{
        res.status(404).json(err)
        console.log(err)
    })

}
module.exports = {
    HomeworkCours,
    deleteHomework,
    showHomework,
    showOneHomeworkId
}