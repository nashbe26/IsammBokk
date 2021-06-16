const User = require('../models/user');
const Cours = require('../models/cours');
const Link = require('../models/link');

const uid = require("uid")

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
    await User.findByIdAndUpdate(id,{verify:'valid'},{new: true}).then(data=>{
        console.log(data);
        res.status(200).json(data)
    }).catch(err =>{
        console.log(err);
    })
}
const approveCours = async (req,res)=>{
    let id = req.params.id
    console.log("dqsdsqd",id);
    await Cours.findById(id).then(async cour =>{
        console.log(cour);
        const data = await Cours.find({date:cour.date})
            console.log(data)
              const data2 =  await Cours.find({hours:cour.hours})
          

              
                if(data2.length != 1 && data.length != 1){
                    await Cours.findByIdAndUpdate(cour._id,{"etat": "pending"},{new: true})
                    res.json({exist : true})}
            else{
                await Cours.findByIdAndUpdate(cour._id,{"etat": "valid"},{new: true}).then(async check=>{     
                })
                res.status(200).json(data)
                console.log("ahwla");
            }
       
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