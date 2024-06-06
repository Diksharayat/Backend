const express =require('express');
const cart_route = require('./routes/cartRoute');
const bodyParser =require("body-parser");
const cors= require("cors");
require("./config/dbConnect");
const app=express();



app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://frontend-pink-eight.vercel.app/');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});


// Middleware
app.use(bodyParser.json());
app.get('/', (req, res) => {
  console.log(req.useragent)
  res.send('Hey this is my API running 🥳')
})


//middlewares
app.use(cors())
app.use(express.json())
//routes

app.use("/api",cart_route);

//cart route


//Error handlers


//listen to the server.
const port = process.env.PORT||10000;
app.listen(port,console.log(`SERVER IS UP AND RUNNING ON PORT ${port}`));