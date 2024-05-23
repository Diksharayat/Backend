
const mongoose =require("mongoose");
var dotenv = require('dotenv');
dotenv.config()
// connect

const dbConnect=async()=>{
  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(process.env.mongo_uri);
    console.log("db connected successfully");
  } catch (error) {
    console.log(error)
    process.exit(1);
  }
}

dbConnect();