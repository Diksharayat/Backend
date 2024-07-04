const express =require('express');
const cart_route = require('./routes/cartRoute');
const bodyParser =require("body-parser");
const cors= require("cors");
const user_route = require('./routes/userRoute');
require("./config/dbConnect");
const app=express();





// Use CORS middleware
app.use(cors());

// Middleware
app.use(bodyParser.json());
app.get('/', (req, res) => {
  console.log(req.useragent)
  res.send('Hey this is my API running 🥳')
})


app.use(express.json())
//routes

app.use("/api",cart_route);
app.use("/api",user_route);

//cart route


//Error handlers


//listen to the server.
const port = process.env.PORT||10000;
app.listen(port,console.log(`SERVER IS UP AND RUNNING ON PORT ${port}`));