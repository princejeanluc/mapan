const Joi = require('joi')
const inf = Joi.object({
    email:Joi.string().email({
        minDomainSegments:2
    }).required(),
    password:Joi.string().pattern(new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"))
})
.with('email','password')

module.exports =(req,res,next)=>{
    const result = inf.validate({
        password:req.body.password,
        email:req.body.email
    })
    if (result.error === undefined){next()}
    else{
        error = {...result}
        error.message = "les données fournies sont invalides ou non conformes "
        res.status(400).json({
            error :error
        })
    }
}