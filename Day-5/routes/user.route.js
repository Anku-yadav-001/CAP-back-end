const express = require("express")
const registerModel = require("../models/user.model")
const registerRoute = express.Router()
const jwt = require("jsonwebtoken")
registerRoute.post("/user-register", async(req,res)=>{
     const {name,email,mobile,password,role} = req.body
     try {
          let user_detail=await new registerModel({name,email,mobile,password,role})
          user_detail.save()
          res.status(200).send("user registered successfully")
     } catch (error) {
          res.status(404).send("failed to register the user")
     }
})

registerRoute.post("/user-login", async (req,res)=>{
     const {email,password} = req.body
     try {
          let user = await registerModel.findOne({email,password})
          if(!user){
               return res.status(400).send("invalid credientials")
          }
          const token = jwt.sign({email:user.email,role:user.role},"masai")
          
          res.status(200).json({"message":"user logged in successfully","token":token})
     } catch (error) {
          res.status(404).send("failed to login the user")
     }
})

module.exports = registerRoute