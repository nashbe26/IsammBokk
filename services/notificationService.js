const Notification = require('../models/notification');

const createNotification = async (notification)=>{
    return await Notification.create(notification)
}
const findOneNotification = async (notificationId)=>{
    return await Notification.findById(notificationId)
}

const deleteNotification = async (notificationId)=>{
    return await Notification.findByIdAndDelete(notificationId)
}
const getAllNotificationById = async (userId)=>{
    return await Notification.find({user:userId})
}

module.exports = {
    findOneNotification,
    deleteNotification,
    getAllNotificationById,
    createNotification
}