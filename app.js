const express = require('express')
const app = express()
const routerEvent = require('./routes/event.js')
const {routerAuth,routerUser} = require('./routes/user.js')
const path = require('path')

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use('/images',express.static(path.join(__dirname,'images')))
app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*')
    res.setHeader('Access-Control-Allow-Headers','Origin, X-Requested-With,Content-Type,Authorization,Accept')
    res.setHeader('Access-Control-Allow-Methods','GET, POST , PUT , DELETE, PATCH , OPTIONS ')
    next()
})


app.use("/event",routerEvent)
app.use("/user",routerUser)
app.use("/auth",routerAuth)
module.exports = app