const Event = require("../models/event.js")


exports.createEvent=(req,res,next)=>{
    new Promise((resolve,reject)=>{
        e = {
            title:req.body.title,
            address:req.body.address,
            datetime:req.body.datetime,
            description:req.body.description,
            poster_url:req.protocol+"://"+req.get('host')+"/images/"+req.file.filename,
            id_user:req.auth.id
        }
        Event.createEvent(e, (error,result)=>{
            if (error){reject(error)}
            else{
                success = {message:"Créer avec succes"}
                res.status(200).json({success:success})}
        })
    }).catch((error)=>{
        res.status(400).json({error :error})})
}

exports.getEvent=(req,res,next)=>{
    new Promise((resolve,reject)=>{
        Event.getEvent(req.params.id, (error,result)=>{
            if (error){reject(error)}
            else{
                if (result[0]===undefined){
                    error = {message :"L'évenement ciblé n'existe pas"}
                    reject(error)
                }
                else{
                    success={message:"successful"}
                    res.status(200).json({data:result})}
            }
        })
    }).catch((error)=>res.status(400).json({error :error}))
}

exports.getAllEvents=(req,res,next)=>{
    new Promise((resolve,reject)=>{
        Event.getAllEvents((error ,result)=>{
            if (error ){reject(error)}
            else{res.status(200).json({data:result})}
        })   
    }).catch((error)=>{
        res.status(400).json({message:"Une erreur est survenu",error:error})
    })
}

exports.updateEvent=(req,res,next)=>{
    
    new Promise((resolve,reject)=>{
        e = {
            id:req.params.id, 
            title:req.body.title,
            address:req.body.address,
            datetime:req.body.datetime,
            description:req.body.description,
            poster_url:req.protocol+"://"+req.get('host')+"/images/"+req.file.filename
        }
        Event.getEvent(req.params.id,(error,result)=>{
            if(error){reject(error)}
            else{
                if(result[0] === undefined){
                    res.status(400).json({message:"L'évenement n'existe pas "})
                }else if(result[0].id_user == req.auth.id){// on verifie que l'utilisateur est proprietaire de l'evenement 
                    Event.updateEvent(e,(error,result)=>{
                        if(error){reject(error)}
                        else{res.status(200).json({message:"Mise à jour effectué"})}
                    })
                }else{
                    res.status(400).json({message:"Autorisation non accordé"})
                }
            }
        })
        
    }).catch((error)=>{
        res.status(400).json({message:"Une erreur est survenu",error:error})
    })
}

exports.deleteEvent=(req,res,next)=>{

    new Promise((resolve,reject)=>{
        Event.getEvent(req.params.id,(error,result)=>{
            if(error!==null){reject(error)}
            else{
                if(result[0]===undefined){
                    res.status(400).json({message:"L'évenement n'existe pas "})
                }else {
                    if(result[0].id_user == req.auth.id){// on verifie que l'utilisateur est proprietaire de l'evenement 
                        Event.deleteEvent(req.params.id,(error,result)=>{
                            if(error){reject(error)}
                            else{res.status(200).json({message:"supprimer avec succes"})}
                        })
                    }else{
                        res.status(400).json({message:"Autorisation non accordé"})
                    }
                }
            }
        })  
    }).catch((error)=>{
        res.status(400).json({message:"Une erreur est survenu",error:error})
    })
}
