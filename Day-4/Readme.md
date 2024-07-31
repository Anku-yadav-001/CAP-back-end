## mongoose
it help us to connect our server and database.

### why mongoose
1. connecting the database
  let url = mongoDD url
  mongoose.connect(url)

2. structure the data
     schema
     -- let schema=mongoose.Schema({
          name:String,
          age:Number
        })

     model
     -- let model=mongoose.model("collection_name",schema)

     product
     -- model.insertMany([{}{}])

--> validate the data