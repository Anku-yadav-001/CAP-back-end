const express = require("express")
const UserModel = require("../models/users.model")
const userRoute = express.Router()
userRoute.post("/add-user",async (req,res)=>{
     const {name,age,address,marriage} = req.body
     try {
          let userEntry = new UserModel({
               name,
               age,
               address,
               marriage
          })
          await userEntry.save()
          res.status(201).send("user added successfully")
     } catch (error) {
          res.status(404).send("failed to add user");
     }
})

userRoute.get("/all-users",async (req,res)=>{
     try {
          let allUsers = await UserModel.find()
          res.status(200).json({"message":"all users details",status:200,allUsers})
     } catch (error) {
          res.status(404).send("error in show the users")
     }
})

userRoute.patch("/update-user/:id", async (req,res)=>{
     const {id} = req.params
     try {
          let updateUser = await UserModel.findByIdAndUpdate({_id:id},req.body)
          res.status(200).json({"message":"user updated successfully",updateUser})
     } catch (error) {
          res.status(404).send("error to update the user")
     }
})

userRoute.delete("/delete-user/:id",async (req,res)=>{
     const {id}=req.params
     try {
          let deletedUser = await UserModel.findByIdAndDelete({_id:id})
          res.status(200).json({"message":"user deleted successfully",deletedUser})
     } catch (error) {
          res.status(404).send("error to delete the user")
     }
})

module.exports = userRoute