
const adminMiddleware = (req, res, next)=>{
     if(req.body.role=="admin"){
          next()
     }
     else{
          res.send("you have not permission to access this route")
     }
}

module.exports = adminMiddleware