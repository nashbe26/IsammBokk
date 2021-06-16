const Cours = require("../models/cours");
const User = require("../models/user");

const createCours = async (req,res)=>{
    console.log(req.body);
    await Cours.create(req.body).then(
         results=>{
            results.student.map(async x=>{
                await User.findByIdAndUpdate(x._id,{"$push":{"cours": results._id}},{new: true}).then(data =>{
                    console.log("dadadad",data.cours);
                })
                await Cours.findByIdAndUpdate(results._id,{"$push":{"student": x._id}},{new: true}).then(data =>{
                    console.log("dadadad",data.student);
                })
        }).catch(err =>{
            res.status(404).json(err)
            console.log(err);
        })
    })

}
const deleteCours = async (req,res) =>{
    const groupId = req.params.id;
    await Cours.findByIdAndDelete(groupId).then(results=>{
        res.status(200).json(results)
    }).catch(err =>{
        res.status(404).json(err)
        console.log(err)
    })
}
const showCours = async (req,res)=>{
    let id = req.params.id
    console.log("showCours", id );
    await Cours.findById(id).populate('userId').then(results=>{
        console.log(results);
        res.status(200).json(results)
    }).catch(err =>{
        console.log(err)
        res.status(404)
    })
}
const showOneCoursId = async (req,res)=>{
    const groupId = req.params.id;
    await Cours.find({userId:groupId}).populate('userId').then(results=>{
        res.status(200).json(results)
    }).catch(err =>{
        res.status(404).json(err)
        console.log(err)
    })

}
module.exports = {
    createCours,
    deleteCours,
    showCours,
    showOneCoursId
}