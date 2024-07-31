const mongoose = require("mongoose")
//schema
let userSchema = mongoose.Schema({
     name: String,
     age: Number,
     address: { type: String, required: true },
     marriage: Boolean
}, {
     versionKey: false
})

//model
let UserModel = mongoose.model("user", userSchema)

module.exports = UserModel