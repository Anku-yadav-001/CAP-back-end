const mongoose = require("mongoose");

const registerSchema = mongoose.Schema({
     name:String,
     email:String,
     mobile:Number,
     password:String,
     role:{
          type:String,
          default:"user"
     }
})
const registerModel = mongoose.model("register",registerSchema)

module.exports = registerModel 