const conversationServices = require('../services/conversationServices');

const newConversation = (req,res)=>{ 
    const newConv = req.body
    const user =conversationServices.createConversation(newConv).then(
        results=>{
            res.json(results)
       }).catch(err =>{
            console.log(err)
       })
    }
const deleteConversation= (req,res)=>{
    const {id} = req.params
    conversationServices.deleteConversation(id).then(
        results=>{
            console.log("converastion deleted ")
        }).catch(err=>{
            console.log(err)
        })
}   
const getConversation = (req,res)=>{
    conversationServices.getAllConversation().then(
        results=>{
            res.json(results)
        }).catch(err=>{
            console.log(err)
        })
}
module.exports = {
    newConversation,
    deleteConversation,
    getConversation
}



