const conversationServices = require('../services/conversationServices');
const userServices = require('../services/userServices');

const newConversation = (req,res)=>{ 
    const conversation=req.body;
    if(conversation._id){
        conversationServices.getOneConversation(conversation._id).then(
            result33=>{
                console.log();
                console.log("i am here",result33);
                const newConversation = {
                    message:{content:conversation.message.content}
                }
                conversationServices.getOneConversation(result33._id).then(
                    checkConv =>{
                    conversationServices.sendMessage(checkConv,newConversation).then(resultskk =>{
                        console.log("i am here 2");
                        res.status(200).json({checkConv})   
                    }).catch(err =>{
                    console.log(err)})
                }).catch(err =>{
                    console.log(err)})
            }
        )
       
    }else{     
        const newConversation = {
        users:conversation.users,
        message:{content:conversation.message.content}
    }
    conversationServices.createConversation(newConversation).then(
        results=>{
            conversationServices.getOneConversation(results._id).then(
                results=>{
                    userServices.findByFilter(results).then(
                        checkforUser =>{
                            checkforUser.map(user =>{
                                userServices.updateUser(user,results)
                            })
                        })
                    conversationServices.sendMessage(results,conversation).then(resultskk =>{
                        conversationServices.getOneConversation(results._id).then(
                            results2 =>{
                                res.json(results2)
                            }).catch(err =>{
                                console.log(err );
                            })
                    }).catch(err =>{
                        console.log(err)})
                    }).catch(err =>{
                        console.log(err)
                    })
    })
    }
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

const getOneConversationPopUp = (req,res)=>{
    const idConv = req.params
    console.log("aaaa",idConv)
    conversationServices.findOneConversation(idConv.id).then(
        results=>{
            console.log(results);
            res.json(results)
        }).catch(err=>{
            console.log(err)
        })
}
const sendMessage = (req,res)=>{
    const conversation=req.body;
        conversationServices.getOneConversation("606bae3b1685fa4b249e50c7").then(
            results=>{
                conversationServices.sendMessage(results,conversation).then(resultskk =>{
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
    sendMessage,
    getOneConversationPopUp
}



