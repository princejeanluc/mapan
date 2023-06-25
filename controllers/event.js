const Event = require("../models/event.js")


exports.createEvent=(req,res,next)=>{
    try{
        e = {
            title:req.body.title,
            address:req.body.address,
            datetime:req.body.datetime,
            description:req.body.description,
            poster_url:req.body.poster_url,
            id_user:req.body.id_user
        }
        Event.createEvent(e, (result)=>{
            res.status(200).json({message:"Créer avec succes"})
        })
    }catch{
        res.status(400).json({message:"Une erreur est survenu"})
    }
}

exports.getEvent=(req,res,next)=>{
    try{
        Event.getEvent(req.params.id, (result)=>{
            res.status(200).json({data:result[0]})
        })
    }catch{
        res.status(400).json({message:"identifiant d'évènement incorrect"})
    }
}

exports.getAllEvents=(req,res,next)=>{
    try{
        Event.getAllEvents((result)=>{
            res.status(200).json({data:result})
        })
    }catch{
        res.status(400).json({message:"Une erreur est survenu"})
    }
}

exports.updateEvent=(req,res,next)=>{
    try{
        e = {
            title:req.body.title,
            address:req.body.address,
            datetime:req.body.datetime,
            description:req.body.description,
            poster_url:req.body.poster_urls
        }
        Event.getEvent(req.params.id,(result)=>{
            if(result ===[]){
                res.status(400).json({message:"L'évenement n'existe pas "})
            }else if(result[0].id_user == req.params.idUser){// on verifie que l'utilisateur est proprietaire de l'evenement 
                Event.updateEvent((result)=>{
                    res.status(200).json({message:"Mise à jour effectué"})
                })
            }else{
                res.status(400).json({message:"Autorisation non accordé"})
            }
        })
    }catch{
        res.status(400).json({message:"Une erreur est survenu"})
    }
}

exports.deleteEvent=(req,res,next)=>{
    try{
        Event.getEvent(req.params.id,(result)=>{
            if(result ===[]){
                res.status(400).json({message:"L'évenement n'existe pas "})
            }else if(result[0].id_user == req.params.idUser){// on verifie que l'utilisateur est proprietaire de l'evenement 
                Event.deleteEvent(req.params.id,(result)=>{
                    res.status(200).json({message:"supprimer avec succes"})
                })
            }else{
                res.status(400).json({message:"Autorisation non accordé"})
            }
        })
    }catch{
        res.status(400).json({message:"Une erreur est survenu"})
    }
}
