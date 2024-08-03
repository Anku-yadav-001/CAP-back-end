const mongoose = require("mongoose")
const url ="mongodb://localhost:27017/evaluation"
const connection = mongoose.connect(url)

module.exports = connection