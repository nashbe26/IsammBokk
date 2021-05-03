const linkServices = require('../services/linkServices')

const addLink = (req,res)=>{
    
    linkServices.addLink(req.body).then(results =>{
        console.log("salem ",results);
    }).catch(err =>{
        console.log(err);
    })
}
const showLink = (req,res)=>{
    body=req.params;
    console.log("salem",req.params.id);
    linkServices.showLink(req.params.id).then(results =>{
        console.log(results);
        res.status(200).json(results)
    }).catch(err=>{
        console.log(err);
    })
}
module.exports = {addLink,showLink};