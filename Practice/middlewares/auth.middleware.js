const jwt = require("jsonwebtoken")

const auth = (req, res, next)=>{
     const {token} = req.query
     jwt.verify(token,"masai",(err,decoded)=>{
          if(err){
               res.send("you have not access of the route")
          }
          next()
     })
}
module.exports = auth