const conversationServices = require('../services/conversationServices');

const newConversation = (req,res)=>{ 
    console.log(req.body)
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
const getOneConversation = (req,res)=>{
    const idConv = req.body
    conversationServices.getAllConversation(idConv).then(
        results=>{
            res.json(results)
        }).catch(err=>{
            console.log(err)
        })
}
const sendMessage = (req,res)=>{
    const idConv=req.body;
    console.log("dsqdsqdsqd",idConv);
    conversationServices.getOneConversation("60651c9beacb9b357c2ba657").then(
        data =>{
            console.log(data)
            conversationServices.sendMessage(data,idConv.message.content).then(
                results =>{
                    res.json(results)
                }).catch(err =>{
                    console.log(err);
                })
        }).catch(err =>{
            console.log(err)
        })
 
}
module.exports = {
    newConversation,
    deleteConversation,
    getConversation,
    getOneConversation,
    sendMessage
}



