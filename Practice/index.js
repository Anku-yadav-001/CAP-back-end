const express = require("express")
const server = express()
const PORT = 8080
const connection = require("./dbconfig/db")
const movieRoute = require("./routes/movie.route")
const registerRoute = require("./routes/register.route")

server.use(express.json())
server.get("/",(req,res)=>{
     res.send("working fine")
})
server.use("/movie", movieRoute)
server.use("/register",registerRoute)
server.listen(PORT,async ()=>{
     try {
          await connection
          console.log("connected to database");
          console.log("server is running on port 8080");         
     } catch (error) {
          console.log("failed to connect with database");
          
     }
})