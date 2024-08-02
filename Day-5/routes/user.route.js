const express = require("express")
const registerModel = require("../models/user.model")
const registerRoute = express.Router()
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

registerRoute.post("/user-register", async(req,res)=>{
     const {name,email,mobile,password,role} = req.body
     try {
          bcrypt.hash(password,5,(err,hash)=>{
               if(err){
                    res.send("error occure during hashing")
               }
               else{
                    let user_detail = new registerModel({ name, email, mobile, password:hash, role })
                    user_detail.save()
                    res.status(200).send("user registered successfully")
               }
          })
          
     } catch (error) {
          res.status(404).send("failed to register the user")
     }
})

registerRoute.post("/user-login", async (req,res)=>{
     const {email,password} = req.body
     try {
          let user = await registerModel.findOne({email})
          if(!user){
               return res.status(400).send("invalid credientials")
          }
          if(user){
               bcrypt.compare(password,user.password,(err,result)=>{
                    if(err){
                         res.send("failed to login")
                    }
                    const token = jwt.sign({ email: user.email, role: user.role }, process.env.SECRET_KEY)
                    res.status(200).json({ "message": "user logged in successfully", "token": token })
               })
          }
          
     } catch (error) {
          res.status(404).send("failed to login the user")
     }
})

module.exports = registerRoute