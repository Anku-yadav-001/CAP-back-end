
const checkUser =(req,res,next)=>{
     if(req.query.token==="aman"){
          next()
     }
     else{
          res.send("unauthorized access")
     }
}
module.exports = checkUser