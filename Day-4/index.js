const express = require("express")
const PORT =8080
const server = express()
const connection = require("./config/db")
const userRoute = require("./route/user.route")
//server
server.use(express.json())
server.use("/user",userRoute)
server.get("/",(req,res)=>{
     res.send("users details")
})


server.listen(PORT,async ()=>{
     try {
          await connection
          console.log("server is running on port", PORT);
          console.log("connected to database");
     } catch (error) {
          console.log("failed to connect with database",error);
     }
})
