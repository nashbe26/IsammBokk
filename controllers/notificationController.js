const Notification = require ('../models/notification');

const getAllById = async (req,res)=>{
    let id = req.params.id
    await Notification.find({user:id}).then(results =>{
        res.status(200).json(results)
    }).catch(err =>{
        res.status(400)
    })
}
const deleteNotification = async (req,res) =>{
    const commentId = req.params.id;
  
    await Notification.findByIdAndDelete(commentId).then(results=>{
        console.log("results",results);
        res.status(200).json(results)
    }).catch(err =>{
        res.status(404)
        console.log(err)
    })
}
module.exports = {
    getAllById,
    deleteNotification
}
