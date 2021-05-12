const Notification = require ('../models/notification');

const getAllById = async (req,res)=>{
    let id = req.params.id

    await Notification.find({idUser:id}).sort({ _id: -1 }).limit(10).populate('idUser').then(results =>{
        res.status(200).json(results);
    }).catch(err =>{
        res.status(400)
    })
}
 const getAllByUserId = async (req,res)=>{
    let id = req.params.id
    console.log(id);
    await Notification.find({idUser:id}).sort({ _id: -1 }).limit(10).populate('idUser').then(results1 =>{
        res.status(200).json(results1);
    }).catch(err =>{
        console.log(err);
        res.status(400).json(err)
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
    deleteNotification,
    getAllByUserId
}
