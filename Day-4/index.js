const mongoose = require("mongoose")
const url = "mongodb://127.0.0.1:27017"

async function main(){
     try {
          await mongoose.connect(url)
          console.log("Connected to database");
     } catch (error) {
          console.log("Failed to connect with database");
     }
}
main()