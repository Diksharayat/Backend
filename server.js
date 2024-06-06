const express = require('express');
const cart_route = require('./routes/cartRoute');
const bodyParser = require("body-parser");
const cors = require("cors");
require("./config/dbConnect");
const app = express();

// Middleware
app.use(bodyParser.json());

// Set CORS headers
const corsOptions = {
  origin: 'https://frontend-pink-eight.vercel.app',
  credentials: true, // Include cookies in CORS requests
  optionSuccessStatus: 200 // Respond with 200 for preflight requests
};
app.use(cors(corsOptions));

// Define routes
app.get('/', (req, res) => {
  console.log(req.useragent);
  res.send('Hey this is my API running 🥳');
});

// Use the cart_route middleware
app.use("/api", cart_route);

// Error handlers

// Listen to the server
const port = process.env.PORT || 10000;
app.listen(port, console.log(`SERVER IS UP AND RUNNING ON PORT ${port}`));
