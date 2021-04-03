const conversationServices = require('../services/conversationServices');
const userServices = require('../services/userServices');

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
    console.log('iam here')
    if (idConv._id){
                    console.log('no found !**********')
                    conversationServices.createConversation(idConv).then(
                        getResults =>{
                            console.log("from createConversation",getResults)
                            conversationServices.getOneConversation(getResults._id).then(
                                results=>{
                                    
                                   // let conversation = results.conversation
                                    conversationServices.sendMessage(results,{content:idConv.message.content,id:idConv.idReceiver}).then(
                                        resultskk =>{
                                            
                                            console.log("qdsdqsdsq **** dqsdqsd",resultskk)
                                        
                                }).catch(err =>{
                                 console.log(err)})
                                })  
                        })}else{
                     conversationServices.sendMessage(idConv.message,{content:idConv.message.content,id:idConv.idReceiver}).then(
                        getResults =>{
                            console.log()
                            console.log('conversation found ****************',getResults)
                        }
                    )
                }
    }
module.exports = {
    newConversation,
    deleteConversation,
    getConversation,
    getOneConversation,
    sendMessage
}



