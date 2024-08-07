const express = require("express")
const registerRoute = express()
const registerModel = require("../model/register.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const auth = require("../middlewares/auth.middleware")
registerRoute.post("/user-register",async (req,res)=>{
     const {name,email,password,mobile} = req.body
     try {
          bcrypt.hash(password,5,async (err,hash)=>{
               if(err){
                    return res.send("failed to hash the password")
               }
               let data = new registerModel({
                    name,
                    email,
                    password:hash,
                    mobile
               })
               await data.save()
               res.send("user registered successfully")
          })
     } catch (error) {
          res.send("error occure during register the user")
     }
})

registerRoute.post("/user-login", async(req,res)=>{
     const {email, password} = req.body
     try {
          let user = await registerModel.findOne({ email })
          if (!user) {
               return res.send("user not exist")
          }
          if(user){
               bcrypt.compare(password,user.password, (err, result) => {
                    if (!result) {
                         return res.send("invalid password")
                    }
                    let token = jwt.sign(email, process.env.SECRET_KEY)
                    res.json({message:"login success",token})
               })
          }
     } catch (error) {
          res.send("failed to logging...")
     }
})

registerRoute.get("/show-data", auth,(req,res)=>{
     res.send("all data ...")
})

module.exports = registerRoute