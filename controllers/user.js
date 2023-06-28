const bcrypt = require("bcrypt")
const User = require("../models/user.js")
const jwt = require("jsonwebtoken")


exports.signup=(req,res,next)=>{
        console.log(req.body)
        new Promise((resolve,reject)=>{
            bcrypt.hash(req.body.password,10).then((hash)=>{
                user = {
                    first_name:req.body.first_name,
                    last_name:req.body.last_name,
                    birthday:req.body.birthday,
                    email:req.body.email,
                    password:hash
                }
                User.createUser(user,(error,result)=>{
                    if(error){reject(error)}
                    else{
                        res.status(200).json({message:"Utilisateur crée avec succès"})
                    }
                })
            }).catch((error)=>{reject(error)})
        }).catch((error)=>{res.status(500).json({message:"une erreur est survenu",error:error})  })
        
    
}

exports.login=(req,res,next)=>{

    new Promise((resolve,reject)=>{
        User.getUserByEmail(req.body.email,(error,result)=>{
            if(error!==null){reject(error)}
            else{
                if (result[0]===undefined){
                    res.status(401).json({message:"L'utilisateur inexistant "})
                }else{
                    console.log(result[0])
                    bcrypt.compare(req.body.password,result[0].pssword).then((valid)=>{
                        if(!valid){
                            res.status(401).json({message:"Mot de passe incorrect"})
                        }else{
                            res.status(200).json({
                                id:result[0].id,
                                token:jwt.sign(
                                    {idUser:result[0].id},
                                    "RANDOM_TOKEN_SECRET",
                                    {expiresIn:"24h"}
                                )})
                        }
                        }).catch((error)=>{
                            res.status(500).json({error:error})
                        })
                }
            }
        })
    }).catch((error)=>{res.status(500).json({message:"erreur dans la verification du mot de passe ",error:error})})
}