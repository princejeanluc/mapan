const jwt = require("jsonwebtoken")
const {decodeTokenAuthorization} = require("../libs/connexion")

module.exports = (req,res,next)=>{
    try{
       decodeTokenAuthorization(req,jwt)
        next()
    }catch(error){
        res.status(401).json({error:error})
    }
}