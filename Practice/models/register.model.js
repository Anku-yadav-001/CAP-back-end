const mongoose = require("mongoose")

//schema
const registerSchema = mongoose.Schema({
     "name":String,
     "email":String,
     "mobile":Number,
     "password":String
})

//model
const registerModel = mongoose.model("register-collection",registerSchema)

module.exports = registerModel