const bcrypt = require("bcrypt")
const User = require("../models/user.js")
const jwt = require("jsonwebtoken")


exports.signup=(req,res,next)=>{
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
                        success = {message:"Utilisateur crée avec succès"}
                        res.status(200).json({success:success})
                    }
                })
            }).catch((error)=>{reject(error)})
        }).catch((error)=>{res.status(500).json({error:error})  })
        
    
}

exports.login=(req,res,next)=>{
    new Promise((resolve,reject)=>{
        User.getUserByEmail(req.body.email,(error,result)=>{
            if(error!==null){reject(error)}
            else{
                let error ={}
                if (result[0]===undefined){
                    error.message = "L'utilisateur inexistant "
                    res.status(401).json({error:error})
                }else{
                    bcrypt.compare(req.body.password,result[0].pssword).then((valid)=>{
                        if(!valid){
                            error.message ="Mot de passe incorrect" 
                            res.status(400).json({error:error})
                        }else{
                            res.status(200).json({
                                id:result[0].id,
                                success :{
                                    message:"Authentifié avec succès"
                                },
                                token:jwt.sign(
                                    {idUser:result[0].id},
                                    "RANDOM_TOKEN_SECRET",
                                    {expiresIn:"24h"}
                                )})
                        }
                        }).catch((error)=>{
                            error.message = "erreur est survenu dans la verification du mot de passe "
                            res.status(500).json({error:error})
                        })
                }
            }
        })
    }).catch((error)=>{
        error.message = "une erreur est survenu lors du processus d'identification "
        res.status(500).json({error:error})})
}



exports.getUser=(req,res,next)=>{
    new Promise((resolve,reject)=>{
        User.getUser(req.auth.id,(error,result)=>{
            if(error !== null) {reject(error)}
            else{
                let user = result[0]
                if(user === undefined){
                    let error = {message : "l'utilisateur n'existe pas "}
                    reject(error)
                }else{
                    delete user.pssword
                    res.status(200).json({
                        success:{message:"successful"},
                        data:[user]
                    })
                }
            }
        })
    }).catch((error)=>{
        error.message = "une erreur est survenu lors de l'extraction de vos informations"
        res.status(500).json({error:error})})
}

exports.getUserById=(req,res,next)=>{
    new Promise((resolve,reject)=>{
        User.getUser(req.params.id,(error,result)=>{
            if(error !== null) {reject(error)}
            else{
                let user = result[0]
                if(user === undefined){
                    let error = {message : "l'utilisateur n'existe pas "}
                    reject(error)
                }else{
                    delete user.pssword
                    if(user.id != req.auth.id){
                        delete user.birthday
                        delete user.email
                    }
                    res.status(200).json({
                        success:{message:"successful"},
                        data:[user]
                    })
                }
            }
        })
    }).catch((error)=>{
        res.status(500).json({error:error})})
}