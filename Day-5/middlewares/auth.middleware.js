const jwt = require("jsonwebtoken")

const auth = (req, res, next)=>{
     const token = req.query.token
     jwt.verify(token, process.env.SECRET_KEY,(err,decode)=>{
          if(err){
               res.send("unauthorized access")
          }else{
               req.body.email=decode.email,
               req.body.role=decode.role
               next()
               
          }
     })
}

module.exports = auth