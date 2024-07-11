const express = require('express')
const server = express()

server.get('/home',(req,res)=>{
     res.send("hello from home page")
})
server.listen(8080,()=>{
     console.log('server runnning on port 8080');
})