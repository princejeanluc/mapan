const express = require('express')
const app = express()
const routerEvent = require('./routes/event.js')

app.use(express.json())

app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*')
    res.setHeader('Access-Control-Allow-Headers','Origin, X-Requested-With,Content-Type,Authorization')
    res.setHeader('Access-Control-Allow-Methods','GET, POST , PUT , DELETE, PATCH , OPTIONS ')
    next()
})


app.use("/event",routerEvent)
module.exports = app