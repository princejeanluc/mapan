const  http = require('http')
const app = require('./app')
const server  = http.createServer(app)



const normalizePort = val =>{
    const port = parseInt(val,10)
    if (isNaN(port)){
        return val 
    }
    else if(port >= 0){
        return port 
    }
    return false 
}

const errorHandler = error =>{
    if (error.syscall !== 'listen') {throw error}
    const address = server.address()
    const bind = typeof address === 'string'? 'pipe'+address: 'port : '+port
    switch(error.code) {
        case 'EACCES':
            console.error(bind+' requires elevated privileges')
            process.exit(1)
            break
        case 'EADDRINUSE':
            console.error(bind+' is already in use')
            process.exit(1)
            break
        default:
            throw error 
    }
}

const port = normalizePort(process.env.PORT||"3000")
server.on("error",errorHandler)
server.on("listening",() =>{
    const address = server.address()
    const bind = typeof address === 'string'? 'pipe' + address : 'port'+ port 
    console.log('Listening on ' + bind)
})

app.set("port",port )

server.listen(port)