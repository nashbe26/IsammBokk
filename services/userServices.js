const User = require('../models/user');

async function getAllUser(){
    const Users = await  User.find();
    return Users;
}
async function getOneUser(userId){
    const oneUser = await User.findById(userId);
    return oneUser;
}
async function deleteUser(userId){
    const deleteUser = await  User.findOneAndDelete(userId)
}

module.exports={
    getAllUser,
    getOneUser,
    deleteUser,
    
}