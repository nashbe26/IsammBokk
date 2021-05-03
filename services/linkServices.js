const Link = require('../models/link');

const addLink = async (link)=>{
    console.log(link);
    return await Link.create(link)
}
const showLink = async (linkId)=>{
    const id = linkId
    return await Link.find({id:id})

}
module.exports ={
    addLink,
    showLink
}