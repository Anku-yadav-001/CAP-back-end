const express = require("express")
const server = express()
const dotenv = require("dotenv").config()
const PORT = process.env.PORT
const connection = require("./dbconfig/db")
const registerRoute = require("./routes/user.route")
const auth  = require("./middlewares/auth.middleware")
const adminMiddleware = require("./middlewares/admin.middleware")

server.use(express.json())
server.use("/register",registerRoute)

server.get("/",(req,res)=>{
     res.send("server is working fine")
})

// -----------------------
server.get("/dashboard", (req, res) => {
     res.send("dashboard data...")
})
server.get("/product",auth, (req, res) => {
     res.send("product data...")
})
server.get("/cart",auth, (req, res) => {
     res.send("cart data...")
})
server.get("/add-product", [auth, adminMiddleware], (req, res) => {
     res.send("product added...")
})
// -----------------------

server.listen(PORT, async ()=>{
     try {
          await connection
          console.log("connected to database");
          console.log("server is running on port", PORT);
     } catch (error) {
          console.log(`failed to connect with database ${error}`);
          
     }
})