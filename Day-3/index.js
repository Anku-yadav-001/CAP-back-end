const express = require('express')
const fs = require('fs')
const server = express()

server.use(express.json())

let logger = (req, res, next)=>{
     let content =`\n URL: ${req.url} at ${Date()}\n`
     fs.appendFileSync("./request_logs.txt",content)
     next()
}

let middleware2=(req, res, next)=>{
     let reqTime=new Date().getTime()
     next()
     let resTime=new Date().getTime()
     let total=resTime-reqTime
     console.log("total time taken by req-res cycle :",total);
}

// server.use(middleware2)
server.get('/home',middleware2,(req,res)=>{
     res.send("hello from home page")
})
server.post('/about',(req,res)=>{
     res.send("hello from about page")
})
server.get('/product',(req,res)=>{
     res.send("hello from product page")
})
server.get('/cart',(req,res)=>{
     res.send("hello from cart page")
})
server.listen(8080,()=>{
     console.log('server runnning on port 8080');
})