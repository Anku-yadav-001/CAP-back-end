const express = require("express")
const registerModel = require("../models/register.model")
const registerRoute = express.Router()
const jwt = require("jsonwebtoken")

registerRoute.post("/user-register",async(req,res)=>{
     const {name,email,mobile,password} = req.body
     try {
          const data = new registerModel({
               name,
               email,
               mobile,
               password
          })
          await data.save()
          res.json({status:200,message:"user registered successfully"})
     } catch (error) {
          res.send("failed to register the user")
     }
})

registerRoute.post("/user-login", async(req,res)=>{
     const {email,password} = req.body
     try {
          let data = await registerModel.findOne({email,password})
          if(!data){
              return res.send("please register first")
          }
          const token = jwt.sign(email,"masai")
          res.json({message:"user logged in successfully",status:200,token})
          
     } catch (error) {
          res.send("failed to login user")
     }
})

module.exports = registerRoute