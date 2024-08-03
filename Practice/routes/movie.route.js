const express = require("express")
const movieRoute = express.Router()
const movieModel = require("../models/movie.model")
const morgan = require("morgan")
const fs = require("fs")
const path = require("path")
const checkUser = require("../middlewares/logger.middleware")

const addInfoInFile = fs.createWriteStream(path.join('access.log'));
const info = `
METHOD: :method
URL   : :url 
HTTP  : :http-version 
STATUS: :status 
LENGTH: :res[content-length] 
RTIME : :response-time ms 
DATE  : :date[iso]`;

movieRoute.use(morgan(info,{stream:addInfoInFile}))
movieRoute.post("/add-movie",checkUser,async (req, res)=>{
     const {name,year,time,director,published} = req.body
     try {
          let data = new movieModel({
               name,
               year,
               time,
               director,
               published
          })
          await data.save()
          res.status(200).send("movie added successfully")
     } catch (error) {
          res.status(404).send("failed to add movie")
     }
})

movieRoute.get("/all-movie",async (req, res)=>{
     const {name,year,time,director,published,page=1,limit=5,sortBy} = req.query
     const query={}
     if(name){
          query.name=new RegExp(name,'i')
     }
     if(year){
          query.year=year
     }
     if(time){
          query.time=time
     }
     if(director){
          query.director = new RegExp(director, 'i')
     }
     if (published) {
          query.published = published == "true"
     }

     const sort ={}
     if(sortBy){
          const [field,order] = sortBy.split(":")
          sort[field]=order ==="desc"?-1:1
     }

     try {                         
          let data = await movieModel.find(query).skip((page - 1) * limit).limit(Number(limit)).sort(sort)
          res.json({status:200,"message":"all movie list",data})
     } catch (error) {
          res.status(404).send("failed to fetch movies")

     }
})

movieRoute.patch("/update-movie/:id", checkUser,async(req, res)=>{
     const {id} = req.params
     try {
          let data = await movieModel.findByIdAndUpdate({_id:id},req.body)
          res.json({ status: 200, "message": "movie updated successfully", data })
     } catch (error) {
          res.status(404).send("failed to update movie")
     }
})

movieRoute.delete("/delete-movie/:id", checkUser,async(req,res)=>{
     const { id } = req.params
     try {
          await movieModel.findByIdAndDelete({_id:id})
          res.json({ status: 200, "message": "movie deleted successfully"})

     } catch (error) {
          res.status(404).send("failed to delete movie")

     }
})
module.exports = movieRoute