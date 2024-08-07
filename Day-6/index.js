const express = require('express')
const server = express()
const dotenv = require("dotenv").config()
const PORT = process.env.PORT
const connection = require("./dbconfig/db")
const registerRoute = require("./route/register.route")

server.use(express.json())
server.use("/register",registerRoute)
server.get("/",(req,res)=>{
     res.send("home page...")
})

server.listen(PORT,async ()=>{
     try {
          await connection
          console.log("connected to database");          
          console.log("server is running on port", PORT); 
     } catch (error) {
          console.log("failed to connect with database");
          
     }
})