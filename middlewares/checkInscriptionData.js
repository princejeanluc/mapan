const Joi = require('joi')
const inf = Joi.object({
    first_name:Joi.string().pattern(new RegExp("^[a-zA-Z'-]{2,30}$")).required(),
    last_name:Joi.string().pattern(new RegExp("^[a-zA-Z'-]{2,30}$")),
    birthday:Joi.date().less("now"),
    password:Joi.string().pattern(new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")),
    email:Joi.string().email({
        minDomainSegments:2
    })
})
.with('firt_name','last_name')
.with('last_name','birthday')
.with('birthday','password')
.with('password','email')

module.exports =(req,res,next)=>{
    const result = inf.validate({
        first_name:req.body.first_name,
        last_name:req.body.last_name,
        birthday:new Date(req.body.birthday),
        password:req.body.password,
        email:req.body.email
    })
    if (result.error === undefined){next()}
    else{
        res.status(400).json({
            message:"les données fournies sont invalides ou non conformes ",
            error : result.error
        })
    }
}