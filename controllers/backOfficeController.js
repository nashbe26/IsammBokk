const User = require('../models/user');
const Cours = require('../models/cours');

const  postUser = async (req,res)=>{
    await User.findAll().then(data=>{
        res.status(200).json(data)
    }).catch(err =>{
        console.log(err);
    })
}

const approveUser = async (req,res)=>{
    let id = req.params.id
    console.log("dddddddd",id );
    await User.findOneAndUpdate({_id:id},{accountStatus:'valid'},{new: true}).then(data=>{
        console.log(data);
        res.status(200).json(data)
    }).catch(err =>{
        console.log(err);
    })
}
const approveCours = async (req,res)=>{
    let id = req.body.params
    await Cours.findById(id).then(async cour =>{
        await Cours.find({date:cour.date,hours:cour.date}).then(async data=>{
            if(data.length >0){
                res.status(200).json(data)
            }else{
                res.status(200).json({valid:'true'})
            }
   
        }).catch(err =>{
            console.log(err);
        })
    })
}

const showCours = async (req,res)=>{
    await Cours.find().populate('userId').then(results=>{
        res.status(200).json(results)
    }).catch(err =>{
        console.log(err)
        res.status(404)
    })
}
const deleteUser = async (req,res)=>{
    let id = body.params.id
    return await  User.findOneAndDelete(id);
}

module.exports = {
    postUser,
    approveUser,
    approveCours,
    deleteUser,
    showCours
}