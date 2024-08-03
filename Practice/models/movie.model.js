const mongoose = require("mongoose")

//schema
const movieSchema = mongoose.Schema({
     "name":String,
     "year":Number,
     "time":Number,
     "director":String,
     "published":Boolean
})

//modle
const movieModel = mongoose.model("movielist",movieSchema)

module.exports = movieModel