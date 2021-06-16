const User = require('../models/user');

async function getAllUser(){
    const Users = await  User.find();
    return Users;
}

async function getOneUser(userId){
  return await User.findById(userId).populate({path : 'conversation',
  populate : {
    path : 'users'
  }
}).populate({path : 'homework',
populate : {
  path : 'userId'
}
}).populate({path : 'cours',
populate : {
  path : 'userId'
}
})
}

async function deleteUser(userId){
    return await  User.findOneAndDelete(userId)
}

async function findByFilter(user){
    return await  User.find({ _id: { $in:user.users  } })
}

async function addPostUser(user){
    return await User.findOneAndUpdate({_id:user._id}, {"$push": {"userFeed": received._id}},{new: true})
}

async function updateUser (user,received){
    return await User.findOneAndUpdate({_id:user._id}, {"$push": {"conversation": received._id}},{new: true})
}

module.exports={
    getAllUser,
    getOneUser,
    deleteUser,
    findByFilter,
    updateUser,
    addPostUser
}