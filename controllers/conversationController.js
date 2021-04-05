const conversationServices = require('../services/conversationServices');
const userServices = require('../services/userServices');

const newConversation = (req,res)=>{ 
    const conversation=req.body;
    conversationServices.findOneConversation(req.body).then(results =>{
        if(results){
            conversationServices.getOneConversation(conversation._id).then(
                results=>{
                    console.log("***************",results)
                    // let conversation = results.conversation
                    conversationServices.sendMessage(results,conversation).then(resultskk =>{
                        console.log("qdsdqsdsq **** dqsdqsd",resultskk)         
                    }).catch(err =>{
                        console.log(err)})
            })   
        }else{
            console.log("***************id not found************")
            conversationServices.createConversation(conversation).then(
                results=>{
                    conversationServices.getOneConversation(results._id).then(
                        results=>{
                            console.log("***************",results)
                            // let conversation = results.conversation
                            conversationServices.sendMessage(results,conversation).then(resultskk =>{
                                console.log("qdsdqsdsq **** dqsdqsd",resultskk)         
                            }).catch(err =>{
                                console.log(err)})
                            }).catch(err =>{
                                console.log(err)
                            })
            })                     
    }
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
    const idConv = req.params
    console.log("aaaa",idConv)
    conversationServices.getOneConversation(idConv.id).then(
        results=>{
            res.json(results)
        }).catch(err=>{
            console.log(err)
        })
}
const sendMessage = (req,res)=>{
    const conversation=req.body;
    

        conversationServices.getOneConversation(conversation._id).then(
            results=>{
                console.log("***************",results)
                // let conversation = results.conversation
                conversationServices.sendMessage(results,idConv).then(resultskk =>{
                    console.log("qdsdqsdsq **** dqsdqsd",resultskk)         
                }).catch(err =>{
                    console.log(err)})
        })   
          
            
}
module.exports = {
    newConversation,
    deleteConversation,
    getConversation,
    getOneConversation,
    sendMessage
}



