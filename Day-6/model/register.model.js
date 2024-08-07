const mongoose = require("mongoose")

const registerSchema = mongoose.Schema({
     "name":String,
     "email":String,
     "password":String,
     "mobile":Number
})

const registerModel = mongoose.model("registered-user",registerSchema)

module.exports = registerModel