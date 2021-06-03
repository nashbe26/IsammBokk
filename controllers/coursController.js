const Cours = require("../models/cours");

const createCours = async (req,res)=>{
    console.log(req.body);
    await Cours.create(req.body).then(
        results=>{
            res.status(202).json(results)
        }).catch(err =>{
            res.status(404).json(err)
            console.log(err);
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
    await Cours.findById(id).then(results=>{
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