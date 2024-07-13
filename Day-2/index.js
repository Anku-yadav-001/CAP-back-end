const http = require('http')

const server = http.createServer((req,res)=>{
    if(req.url==='/user' && req.method==='GET'){
       res.write("Users data")
       res.end()
    }else{
     res.write("not found")
     res.end()
    }
})

server.listen(8080,()=>{
     console.log("Server is running on port 8080");
})